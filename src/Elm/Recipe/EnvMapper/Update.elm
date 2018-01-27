port module Recipe.EnvMapper.Update exposing (Msg(..), update, listen)

import Focus exposing ((=>), Focus, create, set)
import Recipe.EnvMapper.Init exposing (initialInputs)
import Recipe.EnvMapper.Model exposing (Model, Results, Inputs)
import Recipe.EnvMapper.Generator exposing (gen)

port listen : (Inputs -> msg) -> Sub msg
port echo : Results -> Cmd msg

type Msg
    = Listen Inputs
    | CMChange String
    | CMNameChange String
    | CMNamespaceChange String
    | SecChange String
    | SecNameChange String
    | SecNamespaceChange String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        newModel =
            case msg of
                Listen inputs ->
                    { model | inputs = inputs }
                CMChange val ->
                    set (inputs => cm => content) val model

                CMNameChange val ->
                    set (inputs => cm => name) val model

                CMNamespaceChange val ->
                    set (inputs => cm => namespace) val model

                SecChange val ->
                    set (inputs => secret => content) val model

                SecNameChange val ->
                    set (inputs => secret => name) val model

                SecNamespaceChange val ->
                    set (inputs => secret => namespace) val model
    in
    let
        inputs =
            newModel.inputs
        results =
            gen inputs
    in
    ( { newModel | results = results }
    , echo results
    )



-- FOCI


name : Focus { r | name : a } a
name =
    create .name (\f r -> { r | name = f r.name })


namespace : Focus { r | namespace : a } a
namespace =
    create .namespace (\f r -> { r | namespace = f r.namespace })


inputs : Focus { r | inputs : a } a
inputs =
    create .inputs (\f r -> { r | inputs = f r.inputs })


content : Focus { r | content : a } a
content =
    create .content (\f r -> { r | content = f r.content })


cm : Focus { r | cm : a } a
cm =
    create .cm (\f r -> { r | cm = f r.cm })


secret : Focus { r | secret : a } a
secret =
    create .secret (\f r -> { r | secret = f r.secret })
