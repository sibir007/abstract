# MARKDOWN

## Headings

    # Heading level 1

    ## Heading level 2

    ### Heading level 3

    #### Heading level 4

    ##### Heading level 5

    ###### Heading level 6

    Heading level 1
    ===============

    Heading level 2
    ---------------

## Paragraphs

I really like using Markdown.

I think I'll use it to format all of my documents from now on. 

## Line Breaks

This is the first line.  
And this is the second line.

## Bold

I just love **bold text**.

I just love __bold text__.

Love**is**bold

## Italic

Italicized text is the *cat's meow*.

Italicized text is the _cat's meow_.

A*cat*meow

## Bold and Italic

This text is ***really important***.

This text is ___really important___.

This text is __*really important*__.

This text is **_really important_**.

This is really***very***important text.

## Blockquotes

> Dorothy followed her through many of the beautiful rooms in her castle.

### Blockquotes with Multiple Paragraphs

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

### Nested Blockquotes

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

### Blockquotes with Other Elements

>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.

## Lsts

### Ordered Lists

1. First item
2. Second item
3. Third item
4. Fourth item 

1. First item
1. Second item
1. Third item
1. Fourth item 

1. First item
8. Second item
3. Third item
5. Fourth item 

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item 

### Unordered Lists

- First item
- Second item
- Third item
- Fourth item 

* First item
* Second item
* Third item
* Fourth item

+ First item
+ Second item
+ Third item
+ Fourth item 

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item 

### Starting Unordered List Items With Numbers

 - 1968\. A great year!
- I think 1969 was second best. 

### Adding Elements in Lists

* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.


* This is the first list item.
* Here's the second list item.

    > A blockquote would look great below the second list item.

* And here's the third list item.

### Code Blocks

Code blocks are normally indented four spaces or one tab. When they’re in a list, indent them eight spaces or two tabs.

1. Open the file.
2. Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>

3. Update the title to match the name of your website.

## Images

1. Open the file containing the Linux mascot.
2. Marvel at its beauty.

    ![Tux, the Linux mascot](imagformakrdown/image.jpg)

3. Close the file.

## Lists

1. First item
2. Second item
3. Third item
    - Indented item
    - Indented item
4. Fourth item

## Code

At the command prompt, type `nano`.

## Escaping Backticks

``Use `code` in your Markdown file.``

## Code Blocks

To create code blocks, indent every line of the block by at least four spaces or one tab.

    <html>
      <head>
      </head>
    </html>

## Horizontal Rules

To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___) on a line by themselves.

***

---

_________________

## Links

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

## Adding Titles

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

## URLs and Email Addresses

<https://www.markdownguide.org>
<fake@example.com>

## Formatting Links

I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`code`](#code).


## Images

<!-- ![The San Juan Mountains are beautiful!](/assets/images/san-juan-mountains.jpg "San Juan Mountains") -->

![The San Juan Mountains are beautiful!](imagformakrdown/san-juan-mountains.jpg "San Juan Mountains")

## Linking Images

[![An old rock in the desert](imagformakrdown/shiprock.jpg "Shiprock, New Mexico by Beau Rogers")](https://www.flickr.com/photos/beaurogers/31833779864/in/photolist-Qv3rFw-34mt9F-a9Cmfy-5Ha3Zi-9msKdv-o3hgjr-hWpUte-4WMsJ1-KUQ8N-deshUb-vssBD-6CQci6-8AFCiD-zsJWT-nNfsgB-dPDwZJ-bn9JGn-5HtSXY-6CUhAL-a4UTXB-ugPum-KUPSo-fBLNm-6CUmpy-4WMsc9-8a7D3T-83KJev-6CQ2bK-nNusHJ-a78rQH-nw3NvT-7aq2qf-8wwBso-3nNceh-ugSKP-4mh4kh-bbeeqH-a7biME-q3PtTf-brFpgb-cg38zw-bXMZc-nJPELD-f58Lmo-bXMYG-bz8AAi-bxNtNT-bXMYi-bXMY6-bXMYv)

## Escaping Characters

\* Without the backslash, this would be a bullet in an unordered list.

        You can use a backslash to escape the following characters.
        \ 	backslash
        ` 	backtick (see also escaping backticks in code)
        * 	asterisk
        _ 	underscore
        { } 	curly braces
        [ ] 	brackets
        < > 	angle brackets
        ( ) 	parentheses
        # 	pound sign
        + 	plus sign
        - 	minus sign (hyphen)
        . 	dot
        ! 	exclamation mark
        | 	pipe (see also escaping pipe in tables)

## table

### A basic Markdown table

| Item         | Price     | # In stock |
|--------------|-----------|------------|
| Juicy Apples | 1.99      | *7*        |
| Bananas      | **1.89**  | 5234       |

A few things to note:

Start with a header row
Use at least 3 dashes to separate the header cells
Separate cells with a pipe symbol: |
Outer pipes are optional
Cells can contain markdown syntax. See our Markdown cheat sheet for all the Markdown formatting you might need.
You don’t need to make the table look pretty. This will give the exact same result as the table above:

Item | Price | # In stock
---|---|---
Juicy Apples | 1.99 | 739
Bananas | 1.89 | 6

### Aligning columns

You can align columns to the left, center, or right. Alignment is specific around the dashes below the header cell:

To align left, add a colon to the left, like :--- (this is the default)
For right alignment, add a colon to the right, like: ---:
And finally, for center alignment, add two colons, like: :---:
Here’s our product table again, with center-aligned prices and right-aligned stock information. Note that I nicely aligned the text in the entire column, but you don’t have to:

| Item         | Price | # In stock |
|--------------|:-----:|-----------:|
| Juicy Apples |  1.99 |        739 |
| Bananas      |  1.89 |          6 |

## Markdown All in One

### Keyboard Shortcuts

|          CMD           |            VALUE             |
| :--------------------: | :--------------------------: |
|     `Ctrl/Cmd + B`     |         Toggle bold          |
|     `Ctrl/Cmd + I`     |        Toggle italic         |
|  `Alt+S (on Windows)`  |    Toggle strikethrough1     |
|   `Ctrl + Shift + ]`   |   Toggle heading (uplevel)   |
|   `Ctrl + Shift + [`   |  Toggle heading (downlevel)  |
|     `Ctrl/Cmd + M`     |   Toggle math environment    |
|       `Alt + C`        | Check/Uncheck task list item |
| `Ctrl/Cmd + Shift + V` |        Toggle preview        |
|    `Ctrl/Cmd + K V`    |    Toggle preview to side    |

### Available Commands

Markdown All in One: Create Table of Contents
Markdown All in One: Update Table of Contents
Markdown All in One: Add/Update section numbers
Markdown All in One: Remove section numbers
Markdown All in One: Toggle code span
Markdown All in One: Toggle code block
Markdown All in One: Print current document to HTML
Markdown All in One: Print documents to HTML- [MARKDOWN](#markdown)
Markdown All in One: Toggle math environment
Markdown All in One: Toggle list
It will cycle through list markers (by default -, *, +, 1. and 1), which can be changed with option list.toggle.candidate-markers).