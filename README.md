**************************************************************************************************************************
**************************************************************************************************************************
  This is my own implementation of AI Code Translator, USE AT YOUR OWN RISK, DO NOT EXPECT ANY SUPPORT
**************************************************************************************************************************
**************************************************************************************************************************


AI Coder

AI to translate code from one programming language to another.


***************************************************************************************************************************
---Added functionality--- Additional programming languages, a Code Repair/Editor option where a user can input commands for ChatGPT to interpret while working with for the inputted code, 
additional newer GPT models, and added an option to add a tip (in tokens) to your request to encourage ChatGPT to process larger and more complex operations. 

Tips are paid to ChatGPT, I suggest using the latest models like GPT-4-1106-Preview before resorting to adding a tip to encourage ChatGPT to force a complex translation with a tip.
I edited it so ChatGPT only accepts the token amount necessary to complete the task, hopefully it stays true to that, but I'd advise keeping the tip amount at 0 to ensure you're not racking up unnecessary carges.
An estimated tip token amount and cost may be suggested in the output if a task is too complex

Issues: Scrolling through the Languages is too fast, especially since I added more languages. I'm unsure where the setting to correct this is located.
***************************************************************************************************************************
![Ai-Coder](./public/screenshot.png)

## Running Locally

**1. Clone Repo**

```bash
git clone https://github.com/ConceptzX/Ai-Coder.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Run App**

```bash
npm run dev
```
You can add your OpenAI key to the key by replacing the text in the .env.local.example file and renaming it .env to retain the key for future sessions

Currently supported Languages:
**************************************************************************************************************************
'Natural Language'

'A#'

'ABAP'

'ActionScript'

'Ada'

'Apache Conf'

'AppleScript'

'Arduino'

'Apex'

'Assembly Language'

'AssemblyScript'

'Assembly x86'

'AutoHotKey'

'Axum'

'AWK'

'Ballerina'

'Bash'

'Basic'

'Batch'

'BCPL'

'Binary'

'Brainfuck'

'Boo'

'Arduino'

'C'

'C++'

'C#'

'Ceylon'

'Chapel'

'Clipper'

'Clojure'

'Common Lisp'

'COBOL'

'COBOLScript'

'Cobra'

'CoffeeScript'

'ColdFusion'

'Crystal'

'CSS'

'D'

'Dart'

'Delphi'

'Django'

'Dylan'

'EasyLanguage'

'ECMAScript'

'EJS'

'Elixir'

'Elm'

'Emacs Lisp'

'Erlrang'

'F#'

'Fantom'

'Forth'

'Fortran'

'FoxPro'

'FTL'

'Gambas'

'GLSL'

'Go'

'GrGen.NET'

'Groovy'

'Hack'

'Haml'

'Handlebars'

'Haskell'

'Haxe'

'HTML'

'Icon'

'IDL'

'Inform'

'IronPython'

'IronRuby'

'IronScheme'

'Io'

'J'

'J#'

'Jade'

'Java'

'JavaScript'

'JScript'

'JScript.NET'

'JSP'

'JSX'

'Julia'

'KornShell'

'Kotlin'

'LabVIEW'

'LaTeX'

'Lisp'

'LiveScript'

'Logo'

'LOLCODE'

'LSL'

'Lua'

'M'

'Magic'

'Makefile'

'Managed JScript'

'Matlab'

'Mercury'

'MIVA Script'

'Modula-2'

'Modula-3'

'Monkey'

'MoonScript'

'Morse Code'

'Mojo'

'MQL4'

'MQL5'

'Niecza'

'Nemerle

'Nim'

'Nix'

'NoSQL'

'Nunjucks'

'Oberon'

'Objective-C'

'OCaml'

'Oxygene'

'Oz'

'PARI/GP'

'Pascal'

'PascalABC.NET'

'PascalScript'

'Pawn'

'PeachPie'

'Perl'

'PHP'

'Phalanger'

'Pike'

'PL/SQL'

'PowerBuilder'

'PostScript'

'Powershell'

'Progress'

'Prolog'

'Protobuf'

'Pure'

'PureBasic'

'PureScript'

'Python'

'Q'

'R'

'Razor'

'Racket'

'REBOL'

'Red'

'RemObjects Mercury'

'Ring'

'RPG'

'Ruby'

'RubyMotion'

'Rust'

'RustScript'

'SAS'

'Scala'

'Scala.js'

'Scheme'

'Scratch'

'SDL'

'Seed7'

'Shell'

'Silverfrost FTN95'

'Simula'

'Slate'

'SmallBASIC'

'SmallTalk'

'SML'

'Snap!'

'SNOBOL'

'Solidity'

'SPARK'

'SPSS'

'Squirrel'

'Standard ML'

'Stata'

'SuperCollider'

'Swift'

'SQL'

'Swift'

'SwiftUI'

'Synergy DBL.NET'

'Tcl'

'Team Developer'

'Tex'

'TOML'

'Transact-SQL'

'Turing'

'TSX'

'Twig'

'TypeScript'

'UnityScript'

'Vala'

'VHDL'

'Visual Basic'

'Visual Basic 6 - VB6'

'Visual COBOL'

'Visual FoxPro'

'VBA'

'VB.NET'

'VBScript'

'Velocity'

'Verilog'

'Vue'

'Wolfram Language'

'X++'

'X10'

'Xojo'

'XPL'

'XQuery'

'XSharp'

'XSLT'

'Yorick'

'ZenScript'

'Zig'

'Zsh'

'Z Shell'

'Ocatve or GNU Octave'

'Mathematica'

'ThinkScript'

'C++ for SierraChart trading platform'

'Visual Basic for Applications (VBA)'

'Esignal Formula Script (EFS)'

'ProBuilder/ProRealCode, code for the trading platform ProRealTime'

'MetaStock Formula Language (MFL)'

'Amibroker Formula Language (AFL)'

'NinjaScript for NinjaTrader 7'

'NinjaScript for NinjaTrader 8.1.2.0 or higher'

'NinjaScript for NinjaTrader 8.1.1.7 or below'

'Pine Script V3'

'Pine Script V4'

'Pine Script V5'

'Code Repair/Editor'

