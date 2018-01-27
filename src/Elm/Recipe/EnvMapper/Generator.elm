module Recipe.EnvMapper.Generator exposing (gen)

import Base64 exposing (encode)
import Maybe.Extra as Extra
import Recipe.EnvMapper.Model exposing (Inputs, Results)

gen : Inputs -> Results
gen { cm, secret } =
    { cm = genCM cm
    , secret = genSecret secret
    , env = genEnvRef cm secret
    }


genEnvRef cm secret =
    let
        cmRef =
            genEnvRefByType cm "configMapKeyRef"

        secRef =
            genEnvRefByType secret "secretKeyRef"
    in
    "# Paste this into your deployment" ++ cmRef ++ secRef


genEnvRefByType { name, content } refType =
    let
        lines =
            String.lines content

        maybeKeys =
            Extra.combine <| List.map keyOf lines
    in
    case maybeKeys of
        Just keys ->
            List.map (\key -> mapRef refType key name) keys
                |> String.join ""

        Nothing ->
            "Failed to parse cm!"


keyOf line =
    case keyValueOf line of
        Just ( left, right ) ->
            Just left

        Nothing ->
            Nothing


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


keyValueOf : String -> Maybe ( String, String )
keyValueOf line =
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
            Just ( left, right )

        Nothing ->
            Nothing


transformKVFormat : Bool -> String -> Maybe String
transformKVFormat doBase64 line =
    let
        maybeIndex =
            String.indexes "=" line |> List.head
    in
    case keyValueOf line of
        Just ( left, right ) ->
            if doBase64 then
                Just <| "  " ++ left ++ ": " ++ encode right
            else
                Just <| "  " ++ left ++ ": \"" ++ right ++ "\""

        Nothing ->
            Nothing



-- templates


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


mapRef refType key name =
    """
        - name: """ ++ key ++ """
          valueFrom:
            """ ++ refType ++ """:
              key: """ ++ key ++ """
              name: """ ++ name
