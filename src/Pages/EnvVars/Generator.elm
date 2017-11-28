module Pages.EnvVars.Generator exposing (gen)

import Base64 exposing (encode)
import Maybe.Extra as Extra
import Model exposing (Inputs, Results)


gen : Inputs -> Results
gen { cm, secret } =
    { cm = genCM cm
    , secret = genSecret secret
    , env = cm.content ++ "\n" ++ secret.content
    }


genCM cm =
    String.trim <|
        cmHead
            ++ envToCM cm
            ++ objTail cm


genSecret secret =
    String.trim <|
        secHead
            ++ envToSecret secret
            ++ objTail secret


envToCM cm =
    envToObject cm (transformKVFormat False)


envToSecret secret =
    envToObject secret (transformKVFormat True)


envToObject { content } transformer =
    let
        lines =
            String.lines content

        transformedLines =
            Extra.combine <| List.map transformer lines
    in
    case transformedLines of
        Just list ->
            String.join "\n" list

        Nothing ->
            "Failed to parse!"


transformKVFormat : Bool -> String -> Maybe String
transformKVFormat doBase64 line =
    let
        maybeIndex =
            String.indexes "=" line |> List.head
    in
    case maybeIndex of
        Just index ->
            let
                left =
                    String.left index line
                        |> String.trim

                right =
                    String.dropLeft (index + 1) line
                        |> String.trim
            in
            if doBase64 then
                Just <| "  " ++ left ++ ": " ++ encode right
            else
                Just <| "  " ++ left ++ ": \"" ++ right ++ "\""

        Nothing ->
            Nothing


cmHead =
    """
apiVersion: v1
kind: ConfigMap
data:
"""


secHead =
    """
apiVersion: v1
kind: Secret
type: Opaque
data:
"""


objTail { name, namespace } =
    """
metadata:
  name: """ ++ name ++ """
  namespace: """ ++ namespace ++ "\n"
