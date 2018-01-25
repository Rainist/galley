port module Elm.Recipe.EnvMapper.Bridge exposing (..)

import Json.Decode
-- importing Json.Decode is necessary for now because of https://github.com/elm-lang/elm-make/issues/127
import Platform exposing (program, Program)
import Elm.Recipe.EnvMapper.Model exposing (Model)
import Elm.Recipe.EnvMapper.Init exposing (initialModel)
import Elm.Recipe.EnvMapper.Update exposing (Msg(..), listen, update)

---- init ----
init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )

---- Subscriptions ----

subscriptions : Model -> Sub Msg
subscriptions model =
    listen Listen

---- PROGRAM ----
main : Program Never Model Msg
main =
    program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }