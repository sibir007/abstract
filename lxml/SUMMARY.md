# lxml

## The lxml.etree Tutorial

```py
from lxml import etree
```

### The Element class

An Element is the main container object for the ElementTree API. Most of the XML tree functionality is accessed through this class. Elements are easily created through the Element factory:

`>>> root = etree.Element("root")`

The XML tag name of elements is accessed through the tag property:

```sh
>>> print(root.tag)
root
```

Elements are organised in an XML tree structure. To create child elements and add them to a parent element, you can use the append() method:

>>> root.append( etree.Element("child1") )

However, this is so common that there is a shorter and much more efficient way to do this: the SubElement factory. It accepts the same arguments as the Element factory, but additionally requires the parent as first argument:

>>> child2 = etree.SubElement(root, "child2")
>>> child3 = etree.SubElement(root, "child3")

To see that this is really XML, you can serialise the tree you have created:

```sh
>>> etree.tostring(root)
b'<root><child1/><child2/><child3/></root>'
```

We'll create a little helper function to pretty-print the XML for us:

```sh
>>> def prettyprint(element, **kwargs):
...     xml = etree.tostring(element, pretty_print=True, **kwargs)
...     print(xml.decode(), end='')
>>> prettyprint(root)
<root>
  <child1/>
  <child2/>
  <child3/>
</root>
```

### Elements are lists

