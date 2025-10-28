$FRONT = "C:\Users\Tom\Desktop\iguideu-frontend"
$node  = (Get-Command node).Source
cd $FRONT
$Host.UI.RawUI.WindowTitle = "CLIENT - iguideu (Vite 5177)"
& $node ".\node_modules\vite\bin\vite.js" --host=127.0.0.1 --port=5177
