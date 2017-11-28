module Pages.EnvVars exposing (view)

import Html exposing (Html, div, h1, h2, h4, img, input, text, textarea)
import Html.Attributes exposing (placeholder, readonly, src)
import Html.Events exposing (onInput)
import Init exposing (cmEnvPH, secretEnvPH)
import Model exposing (Model)
import Tachyons exposing (classes)
import Tachyons.Classes exposing (b, f2, fl, green, light_blue, pa2, w_50, w_third)
import Update exposing (Msg(..))


view : Model -> Html Msg
view model =
    div []
        [ inputs model
        , results model.results
        ]


inputs model =
    div []
        [ h2 [ classes [ green ] ]
            [ text "Let's generate envs and configmaps and secrets at once!"
            ]
        , box_1_2
            [ field cmEnvPH.name CMNameChange
            , field cmEnvPH.namespace CMNamespaceChange
            , inputBox "ENVs for configmap" cmEnvPH.content CMChange
            ]
        , box_1_2
            [ field secretEnvPH.name SecNameChange
            , field secretEnvPH.namespace SecNamespaceChange
            , inputBox "ENVs for secret" secretEnvPH.content SecChange
            ]
        ]


box_1_2 children =
    div [ classes [ fl, w_50, pa2 ] ] children


box_1_3 children =
    div [ classes [ fl, w_third, pa2 ] ] children


field ph msg =
    div []
        [ input [ placeholder ph, onInput msg ] []
        ]


inputBox title ph msg =
    div []
        [ h4 []
            [ text title
            ]
        , textarea [ placeholder ph, onInput msg ] []
        ]


results { cm, secret, env } =
    div []
        [ h2 [ classes [ light_blue ] ] [ text "Results" ]
        , box_1_3
            [ resultBox "Configmap object" cm ]
        , box_1_3
            [ resultBox "Secret object" secret ]
        , box_1_3
            [ resultBox "Env snippet" env ]
        ]


resultBox title content =
    div []
        [ h4 []
            [ text title
            ]
        , div []
            [ textarea [ readonly True ]
                [ text <| String.trim content ]
            ]
        ]
