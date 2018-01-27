module Transformer = {
  let header = "apiVersion: v1\nkind: ConfigMap\ndata:\n";

  let filenameLine = (filename) =>
    "  " ++ filename ++ ": |\n";

  let filecontentBlock = (filecontent) => {
    filecontent
      |> Js.String.split("\n")
      |> Array.to_list
      |> List.map((line) => "    " ++ line)
      |> String.concat("\n")
      |> (joined) => joined ++ "\n"
  };

  let metadata = (name, ns) =>
    "metadata: \n" ++
    "  name: " ++ name ++ "\n" ++
    "  namespace: " ++ ns ++ "\n";

  let transform = (name, ns, filename, filecontent) =>
    header ++
    filenameLine(filename) ++
    filecontentBlock(filecontent) ++
    metadata(name, ns);
};

let genCM = Transformer.transform;
