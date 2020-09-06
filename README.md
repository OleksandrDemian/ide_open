## :card_index: Contents

- [IDE Open](#desktop_computer-ide-open)
- [Usage](#wrench-usage)
    - [Installation](#building_construction-installation)
    - [Add editor](#rocket-add-editor)
    - [Open folder in editor](#open_file_folder-open-folder-in-editor)
    - [Remove editor](#axe-remove-editor)
    - [List editors](#card_file_box-list-editors)

## :desktop_computer: IDE Open
Opens a folder in editor from cli

![open-ide](https://raw.githubusercontent.com/OleksandrDemian/ide_open/master/public/open-ide.png)

## :wrench: Usage

### :building_construction: Installation

Install open-ide globaly from npm:
```
npm i -g open-ide
```

### :rocket: Add editor

```
open-ide add <alias> <path>
```
Example:
```
open-ide add vscode C:\PATH\TO\VSCODE\Code.exe
```

### :open_file_folder: Open folder in editor

```
open-ide
```

Note: if you have only one editor declared, it will be used as default,
otherwise open-ide will ask you to choose the editor (from a list)

### :axe: Remove editor

```
open-ide rm <alias>
```

Example:

```
open-ide rm vscode
```

### :card_file_box: List editors

```
open-ide list
```