module Main exposing (..)

import Model exposing (Model)
import Init exposing (initialModel)
import Update exposing (Msg(..), update)
import View exposing (view)
import Html exposing (Html)


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
