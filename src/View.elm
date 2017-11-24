module View exposing (view)

import Model exposing (Model)
import Update exposing (Msg(..))
import Html exposing (Html, h1, div, text)
import Pages.EnvVars as EnvVars

view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Galley - A kitchen to cook k8s objects" ]
        , EnvVars.view model
        ]
