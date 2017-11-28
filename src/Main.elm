module Main exposing (..)

import Html exposing (Html)
import Init exposing (initialModel)
import Model exposing (Model)
import Update exposing (Msg(..), update)
import View exposing (view)


init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
