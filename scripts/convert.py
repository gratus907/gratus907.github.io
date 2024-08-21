from pandoc import * 
from pandoc.types import *

def is_theorem(elt):
    match elt:
        case Div((_, classes, _), _) if "definition" in classes:
            return True
        case _:
            return False
        
def LaTeX(text):
    return RawBlock(Format("latex"), text)

def theoremize(doc):
    for elt in pandoc.iter(doc):
        if is_theorem(elt):
            print(elt)
            attr, blocks = elt # elt: Div(Attr, [Block])
            for block in blocks:
                print(block)
            # print(attr, blocks, sep="\n")
            # id_ = attr[0] # attrs: (Text, [Text], [(Text, Text)])
            # label = r"\label{" + id_ + "}" if id_ else ""
            # start_theorem = LaTeX(r'\begin{theorem}' + label)
            # end_theorem   = LaTeX(r'\end{theorem}')
            # blocks[:] = [start_theorem] + blocks + [end_theorem]

text = open("ex.tex", 'r').read()

doc = pandoc.read(text, format="latex")
theoremize(doc)