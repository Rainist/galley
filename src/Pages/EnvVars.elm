module Pages.EnvVars exposing (view)

import Html exposing (Html, article, div, h1, h2, h4, img, input, p, text, textarea)
import Html.Attributes exposing (class, placeholder, readonly, src)
import Html.Events exposing (onInput)
import Init exposing (cmEnvPH, secretEnvPH)
import Markdown
import Model exposing (Model)
import Tachyons exposing (classes)
import Tachyons.Classes
    exposing
        ( b
        , b__black_10
        , ba
        , bg_near_white
        , black_60
        , br3
        , br__top
        , f2
        , f5_ns
        , f6
        , flex
        , flex_column
        , green
        , h_100
        , lh_copy
        , light_blue
        , ma2
        , measure
        , mv0
        , mv4
        , mw5
        , mw6_ns
        , pa2
        , ph3
        , pv2
        , tj
        , w_50
        , w_third
        )
import Update exposing (Msg(..))


view : Model -> Html Msg
view model =
    div [ classes [ flex_column ] ]
        [ inputs model
        , results model.results
        ]


inputs model =
    div []
        [ h2 [ classes [ green ] ]
            [ text "Let's generate envs and configmaps and secrets at once!"
            ]
        , div [ classes [ flex ] ]
            [ box_1_2
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
        ]


box_1_2 children =
    div [ classes [ w_50, pa2 ] ] children


box_1_3 children =
    div [ classes [ w_third, pa2 ] ] children


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
        , div [ classes [ flex ] ]
            [ box_1_3
                [ resultBox "Configmap object" cm ]
            , box_1_3
                [ resultBox "Secret object" secret ]
            , box_1_3
                [ resultBox "Env snippet" env ]
            ]
        ]


resultBox title content =
    let
        trimmedContent =
            String.trim content

        codeBlock =
            Markdown.toHtml
                [ -- class "content"
                  classes [ lh_copy ]
                ]
            <|
                "```\n"
                    ++ trimmedContent
                    ++ "\n```"
    in
    article [ classes [ mw5, mw6_ns, br3, ba, b__black_10, mv4 ] ]
        [ h4 [ classes [ bg_near_white, br3, br__top, black_60, mv0, pv2, ph3 ] ]
            [ text title
            ]
        , p
            [ classes
                [ f6
                , ma2
                , f5_ns
                , lh_copy
                , measure
                , tj
                ]
            ]
            [ codeBlock ]
        ]
