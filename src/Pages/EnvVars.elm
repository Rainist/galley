module Pages.EnvVars exposing (view)

import Model exposing (Model)
import Init exposing (cmEnvPH, secretEnvPH)
import Update exposing (Msg(..))
import Html exposing (Html, text, div, img, textarea, h1, h2, h4)
import Html.Attributes exposing (src, placeholder, readonly)
import Html.Events exposing (onInput)

import Tachyons exposing (classes)
import Tachyons.Classes exposing (f2, b, fl, w_50, w_third, pa2, light_blue, green)

view : Model -> Html Msg
view model =
    div []
        [ inputs model
        , results model.results]

inputs model =
    div []
        [ h2 [ classes [ green ] ]
            [ text "Let's generate envs and configmaps and secrets at once!"
            ]
        , box_1_2
            [ inputBox model "ENVs for configmap" cmEnvPH CMChange
            ]
        , box_1_2
            [ inputBox model "ENVs for secret" secretEnvPH SecChange
            ]
        ]

box_1_2 children =
    div [ classes [ fl, w_50, pa2 ] ] children
box_1_3 children =
    div [ classes [ fl, w_third, pa2 ] ] children

inputBox model title ph msg =
    div []
        [ h4 []
            [ text title
             ]
        , textarea [ placeholder ph, onInput msg ] []
        ]

results {cm, secret, env} =
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
                    [ text content ]
              ]
        ]
