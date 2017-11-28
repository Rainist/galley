module View exposing (view)

import Html exposing (Html, div, h1, text)
import Model exposing (Model)
import Pages.EnvVars as EnvVars
import Tachyons exposing (classes)
import Tachyons.Classes exposing (f5)
import Update exposing (Msg(..))


view : Model -> Html Msg
view model =
    div [ classes [ f5 ] ]
        [ h1 [] [ text "Galley - A kitchen to cook k8s objects" ]
        , EnvVars.view model
        ]
