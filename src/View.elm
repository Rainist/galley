module View exposing (view)

import Html exposing (Html, div, h1, text)
import Model exposing (Model)
import Pages.EnvVars as EnvVars
import Update exposing (Msg(..))


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Galley - A kitchen to cook k8s objects" ]
        , EnvVars.view model
        ]
