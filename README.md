# IDE Open
Opens a folder in editor from cli

### Installation

Install open-ide globaly from npm:
```
npm i -g open-ide
```

### Add editor

```
open-ide add <alias> <path>
```
Example:
```
open-ide add vscode C:\PATH\TO\VSCODE\Code.exe
```

### Open folder in editor

```
open-ide
```

Note: if you have only one editor declared, it will be used as default,
otherwise open-ide will ask you to choose the editor (from a list)

### Remove editor

```
open-ide rm <alias>
```

Example:

```
open-ide rm vscode
```

### List editors

```
open-ide list
```