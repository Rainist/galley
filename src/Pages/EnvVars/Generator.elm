module Pages.EnvVars.Generator exposing (gen)

import Maybe.Extra as Extra
import Model exposing (Inputs, Results)


gen : Inputs -> Results
gen { cm, secret } =
    { cm = genCM cm
    , secret = secret.content
    , env = cm.content ++ "\n" ++ secret.content
    }


genCM cm =
    String.trim <|
        cmHead
            ++ envToCm cm
            ++ cmTail cm


envToCm { content } =
    let
        lines =
            String.lines content

        transformedLines =
            Extra.combine <| List.map transformKVFormat lines
    in
    case transformedLines of
        Just list ->
            String.join "\n" list

        Nothing ->
            "Failed to parse!"


transformKVFormat : String -> Maybe String
transformKVFormat line =
    let
        maybeIndex =
            String.indexes "=" line |> List.head
    in
    case maybeIndex of
        Just index ->
            let
                left =
                    String.left index line

                right =
                    String.dropLeft (index + 1) line
            in
            Just <| "  " ++ left ++ ": \"" ++ right ++ "\""

        Nothing ->
            Nothing


cmHead =
    """
apiVersion: v1
kind: ConfigMap
data:
"""


cmTail { name, namespace } =
    """
metadata:
  name: """ ++ name ++ """
  namespace: """ ++ namespace ++ "\n"
