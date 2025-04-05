- [Roust](#roust)
  - [The Rust API Guidelines.](#the-rust-api-guidelines)
  - [install](#install)
  - [THE RUST PROGRAMMING LANGUAGE 2nd Edition by Steve Klabnik and Carol Nichols](#the-rust-programming-language-2nd-edition-by-steve-klabnik-and-carol-nichols)
    - [3. Common Programming Concepts](#3-common-programming-concepts)
      - [Variables and Mutability](#variables-and-mutability)
          - [1. When a variable is immutable?](#1-when-a-variable-is-immutable)
          - [2. What is constant?](#2-what-is-constant)
          - [3. How differense between constants and variables?](#3-how-differense-between-constants-and-variables)
          - [4. What Rust’s naming convention for constants?](#4-what-rusts-naming-convention-for-constants)
          - [5. When Constants are valid?](#5-when-constants-are-valid)
          - [6. What is Shadowing?](#6-what-is-shadowing)
          - [7. What different Shadowing from marking mut?](#7-what-different-shadowing-from-marking-mut)
      - [Data Types](#data-types)
          - [8. What means data types?](#8-what-means-data-types)
          - [9. What subsets of data types are there in rust?](#9-what-subsets-of-data-types-are-there-in-rust)
          - [10. What means that rust is statically typed language?](#10-what-means-that-rust-is-statically-typed-language)
          - [11. How declared types in Rust?](#11-how-declared-types-in-rust)
          - [12. What is scalar data types?](#12-what-is-scalar-data-types)
          - [13. What is integer data type?](#13-what-is-integer-data-type)
          - [14. What are there integers data types?](#14-what-are-there-integers-data-types)
          - [15. What means Signed and Unsigned integer data type?](#15-what-means-signed-and-unsigned-integer-data-type)
          - [16. How many value does it contain signed integer data types?](#16-how-many-value-does-it-contain-signed-integer-data-types)
          - [17. How many value does it contain unsigned integer data types?](#17-how-many-value-does-it-contain-unsigned-integer-data-types)
          - [18. what length are they `isize` and `usize` types?](#18-what-length-are-they-isize-and-usize-types)
          - [19. what is the default integer data type in Rust?](#19-what-is-the-default-integer-data-type-in-rust)
          - [20. What is integer overflow?](#20-what-is-integer-overflow)
          - [21. What method are used to explicitly handle the possibility of integer overflow?](#21-what-method-are-used-to-explicitly-handle-the-possibility-of-integer-overflow)
          - [22. What is floating-point data type?](#22-what-is-floating-point-data-type)
          - [23. what is the default floating-point data type in Rust?](#23-what-is-the-default-floating-point-data-type-in-rust)
          - [24. Signed or unsigned floating-point types?](#24-signed-or-unsigned-floating-point-types)
          - [25. What is boolean data type?](#25-what-is-boolean-data-type)
          - [26. What is char data type?](#26-what-is-char-data-type)
          - [27. What is compound data types?](#27-what-is-compound-data-types)
          - [28. What is tuple data type?](#28-what-is-tuple-data-type)
          - [29. What is pattern matching data type?](#29-what-is-pattern-matching-data-type)
          - [30. How to get access to tuple value?](#30-how-to-get-access-to-tuple-value)
          - [31. What is it called tuple  without any values?](#31-what-is-it-called-tuple--without-any-values)
          - [32. what do expressions return f they don’t return any other value.](#32-what-do-expressions-return-f-they-dont-return-any-other-value)
          - [33. What is Array type?](#33-what-is-array-type)
          - [34. How create array?](#34-how-create-array)
          - [35. How Accessing Array Elements?](#35-how-accessing-array-elements)
      - [Functions](#functions)
          - [36. What is the entry point in program in Rust](#36-what-is-the-entry-point-in-program-in-rust)
          - [37. How to define function](#37-how-to-define-function)
          - [38. How to write correctly function name?](#38-how-to-write-correctly-function-name)
          - [39. How to call function](#39-how-to-call-function)
          - [40. What is parameters function?](#40-what-is-parameters-function)
      - [Statements and Expressions](#statements-and-expressions)
          - [41. What is Statement and Expression](#41-what-is-statement-and-expression)
          - [42. How function return values?](#42-how-function-return-values)
      - [Comments](#comments)
          - [43. How in Rust write comment?](#43-how-in-rust-write-comment)
      - [Control Flow - If expression](#control-flow---if-expression)
          - [44. what is "If" expression used for?](#44-what-is-if-expression-used-for)
          - [45. Can use If expression in  let statement?](#45-can-use-if-expression-in--let-statement)
      - [Control Flow - Loops](#control-flow---loops)
          - [46. what are Loops needed for](#46-what-are-loops-needed-for)
          - [47. what types of iterations are there in Rust](#47-what-types-of-iterations-are-there-in-rust)
          - [48. what is "loop" keyword used for?](#48-what-is-loop-keyword-used-for)
          - [49. how stop execution `loop`?](#49-how-stop-execution-loop)
          - [50. how to continue a `loop` from the beginning at a certain point?](#50-how-to-continue-a-loop-from-the-beginning-at-a-certain-point)
          - [51. How return value from `loop`](#51-how-return-value-from-loop)
          - [52. How use Labels in Loops?](#52-how-use-labels-in-loops)
          - [53. how can i implement conditional iteration - while](#53-how-can-i-implement-conditional-iteration---while)
          - [54. how can i implement iteration of collection of elements - for](#54-how-can-i-implement-iteration-of-collection-of-elements---for)
          - [55. countdown example by using `for` loop](#55-countdown-example-by-using-for-loop)
    - [4. Understanding Ownership](#4-understanding-ownership)
          - [56. What concepts ensure memory safety in Rust programs at compile time](#56-what-concepts-ensure-memory-safety-in-rust-programs-at-compile-time)
      - [Ownership](#ownership)
          - [57. Why do you need to manage memory?](#57-why-do-you-need-to-manage-memory)
          - [58. What's the difference between stack and heap](#58-whats-the-difference-between-stack-and-heap)
          - [59. What is Stack?](#59-what-is-stack)
          - [60. What is Heap?](#60-what-is-heap)
          - [61. What are the methods of memory management?](#61-what-are-the-methods-of-memory-management)
          - [62. What is the problem associated with memory management?](#62-what-is-the-problem-associated-with-memory-management)
          - [63. What Is Ownership?](#63-what-is-ownership)
          - [64. Ownership Rules?](#64-ownership-rules)
          - [65. how does memory allocation happen in Rust?](#65-how-does-memory-allocation-happen-in-rust)
          - [66. What is scope?](#66-what-is-scope)
          - [67. how does memory free happen in Rust?](#67-how-does-memory-free-happen-in-rust)
          - [68. What happens when we assign a variable to another variable?](#68-what-happens-when-we-assign-a-variable-to-another-variable)
          - [69. What is Move?](#69-what-is-move)
          - [70. where in a code a variable is valid?](#70-where-in-a-code-a-variable-is-valid)
          - [71. What is ownership pattern?](#71-what-is-ownership-pattern)
          - [72. What do deep copy i.e. not only copy of stack data, bat heep data](#72-what-do-deep-copy-ie-not-only-copy-of-stack-data-bat-heep-data)
          - [73. what happens when we assign a variable whose value type implements the Copy trait, to another variable?](#73-what-happens-when-we-assign-a-variable-whose-value-type-implements-the-copy-trait-to-another-variable)
          - [74. what happens when we annotate a type with Copy if the type, or any of its parts, has implemented the Drop trait?](#74-what-happens-when-we-annotate-a-type-with-copy-if-the-type-or-any-of-its-parts-has-implemented-the-drop-trait)
          - [75. What types implement the Copy trait?](#75-what-types-implement-the-copy-trait)
          - [76. What happen when we passing a value to a function?](#76-what-happen-when-we-passing-a-value-to-a-function)
      - [References and Borrowing](#references-and-borrowing)
          - [77. What is reference?](#77-what-is-reference)
          - [78. why do we need to pass a reference and not a value?](#78-why-do-we-need-to-pass-a-reference-and-not-a-value)
          - [79. What is Borrowing?](#79-what-is-borrowing)
          - [80. what happens if we try to modify something we’re borrowing?](#80-what-happens-if-we-try-to-modify-something-were-borrowing)
          - [81. What needs to be done to create a mutable reference?](#81-what-needs-to-be-done-to-create-a-mutable-reference)
          - [82. What is a reference’s scope](#82-what-is-a-references-scope)
          - [83. What restriction have a mutable references?](#83-what-restriction-have-a-mutable-references)
          - [84. What is a dangling pointer?](#84-what-is-a-dangling-pointer)
          - [85. How the problem of dangling pointer solved in Rust?](#85-how-the-problem-of-dangling-pointer-solved-in-rust)
          - [86. Rules of References?](#86-rules-of-references)
      - [The Slice Type](#the-slice-type)
          - [87. What is Slice?](#87-what-is-slice)
          - [88. Does Slice have Ownership?](#88-does-slice-have-ownership)
          - [89. What is String Slices?](#89-what-is-string-slices)
          - [90. How in Slice to start at index 0?](#90-how-in-slice-to-start-at-index-0)
          - [91. How to go to the last index in slice?](#91-how-to-go-to-the-last-index-in-slice)
          - [92. How to get all String in Slice?](#92-how-to-get-all-string-in-slice)
          - [93. How  rewrite first\_word to return a slice?](#93-how--rewrite-first_word-to-return-a-slice)
          - [94. What type string literal?](#94-what-type-string-literal)
          - [95. How we can pass a String to string slice?](#95-how-we-can-pass-a-string-to-string-slice)
    - [5. Using Structs to Structure Related Data](#5-using-structs-to-structure-related-data)
          - [96. What is Struct?](#96-what-is-struct)
      - [5.1 Defining and Instantiating Structs](#51-defining-and-instantiating-structs)
          - [97. What is the similarity structs and tuples?](#97-what-is-the-similarity-structs-and-tuples)
          - [98. What is the difference structs and tuples?](#98-what-is-the-difference-structs-and-tuples)
          - [99. How are structures over tuples more flexible?](#99-how-are-structures-over-tuples-more-flexible)
          - [100. How define Struct?](#100-how-define-struct)
          - [101. What are Struct fields?](#101-what-are-struct-fields)
          - [102. How is defined Struct used?](#102-how-is-defined-struct-used)
          - [103. How we create instance of the struct?](#103-how-we-create-instance-of-the-struct)
          - [104. In what order do we specify field when creating struct?](#104-in-what-order-do-we-specify-field-when-creating-struct)
          - [105. How to get a specific value from a struct?](#105-how-to-get-a-specific-value-from-a-struct)
          - [106. What is needed to be able to change the value of the Struct field?](#106-what-is-needed-to-be-able-to-change-the-value-of-the-struct-field)
          - [107. What is 'field init shorthand' syntax?](#107-what-is-field-init-shorthand-syntax)
          - [108. What is 'struct update' syntax?](#108-what-is-struct-update-syntax)
          - [109. What is Tuple Structs?](#109-what-is-tuple-structs)
          - [110. How define Tuple Struct?](#110-how-define-tuple-struct)
          - [111. What is Unit-Like Structs?](#111-what-is-unit-like-structs)
          - [112. How define Unit-Like Struct?](#112-how-define-unit-like-struct)
          - [113. What are Unit-Like Structs for?](#113-what-are-unit-like-structs-for)
          - [114. Is it possible to create a structure that stores references to data that someone else owned?](#114-is-it-possible-to-create-a-structure-that-stores-references-to-data-that-someone-else-owned)
      - [5.2 An Example Program Using Structs](#52-an-example-program-using-structs)
          - [115. What means curly brackets in 'println!'?](#115-what-means-curly-brackets-in-println)
          - [116. How we can add printing an instance of Struct while we’re debugging our program and see the values for all its fields?](#116-how-we-can-add-printing-an-instance-of-struct-while-were-debugging-our-program-and-see-the-values-for-all-its-fields)
          - [117. How we can implement Display or Debug trait in Struct?](#117-how-we-can-implement-display-or-debug-trait-in-struct)
          - [118. What is difference between `println!` and `dbg!` macro](#118-what-is-difference-between-println-and-dbg-macro)
          - [119. What other attributes are there besides 'derive'?](#119-what-other-attributes-are-there-besides-derive)
      - [5.3 Method Syntax](#53-method-syntax)
          - [120. What is a "Method"?](#120-what-is-a-method)
          - [121. How to define a method?](#121-how-to-define-a-method)
          - [122. What difference using `&self` `&mut self` and `self` in method?](#122-what-difference-using-self-mut-self-and-self-in-method)
          - [123. Do we can use equal names for fields and methods in Struct?](#123-do-we-can-use-equal-names-for-fields-and-methods-in-struct)
          - [124. How called all functions defined in Struct impl block?](#124-how-called-all-functions-defined-in-struct-impl-block)
          - [125. Do can we create association function without self as first argument?](#125-do-can-we-create-association-function-without-self-as-first-argument)
          - [126. How do we call association function?](#126-how-do-we-call-association-function)
          - [127. How many impl Blocks can do have Struct?](#127-how-many-impl-blocks-can-do-have-struct)
    - [6. Enums and Pattern Matching](#6-enums-and-pattern-matching)
          - [128. What is enum used for?](#128-what-is-enum-used-for)
      - [6.1 Defining an Enum](#61-defining-an-enum)
          - [129. How define Enum?](#129-how-define-enum)
          - [130. what called enum instances?](#130-what-called-enum-instances)
          - [131. How can we get an enum variant?](#131-how-can-we-get-an-enum-variant)
          - [132. Do can we used enum type as function parameter?](#132-do-can-we-used-enum-type-as-function-parameter)
          - [133. How we can define method in enum?](#133-how-we-can-define-method-in-enum)
          - [134. What is Null value?](#134-what-is-null-value)
          - [135. How in Rust implementing Null value?](#135-how-in-rust-implementing-null-value)
          - [136. How do we can use Options variants?](#136-how-do-we-can-use-options-variants)
          - [137. For what using `Options<T>` type?](#137-for-what-using-optionst-type)
      - [6.2 The match Control Flow Construct](#62-the-match-control-flow-construct)
          - [138. What is `match`?](#138-what-is-match)
          - [139. How `match` works?](#139-how-match-works)
          - [140. How to extract values out of enum variants?](#140-how-to-extract-values-out-of-enum-variants)
          - [141. How to extract values out of `Option<T>` enum?](#141-how-to-extract-values-out-of-optiont-enum)
          - [142. Do we match all possibilities in match expression?](#142-do-we-match-all-possibilities-in-match-expression)
          - [143. What are methods for match all possibilities in match expression?](#143-what-are-methods-for-match-all-possibilities-in-match-expression)
          - [144. What is difference between usage `other` and `_` keyword in `match`](#144-what-is-difference-between-usage-other-and-_-keyword-in-match)
      - [6.3 Concise Control Flow with if let and let else](#63-concise-control-flow-with-if-let-and-let-else)
          - [145. What is `if let` control flow syntax?](#145-what-is-if-let-control-flow-syntax)
    - [7. Managing Growing Projects with Packages, Crates, and Modules](#7-managing-growing-projects-with-packages-crates-and-modules)
      - [7.1 Packages and Crates](#71-packages-and-crates)
          - [146. What is Crate?](#146-what-is-crate)
          - [147. What forms crates exists?](#147-what-forms-crates-exists)
          - [148. What is Binary crates?](#148-what-is-binary-crates)
          - [149. what is the distinctive feature Binary crates?](#149-what-is-the-distinctive-feature-binary-crates)
          - [150. What is Library crates?](#150-what-is-library-crates)
          - [151. What is crate root?](#151-what-is-crate-root)
          - [152. What is package?](#152-what-is-package)
          - [153. How many crates can have package?](#153-how-many-crates-can-have-package)
          - [154. How many library crates can have package?](#154-how-many-library-crates-can-have-package)
          - [155. How many binary crates can have package?](#155-how-many-binary-crates-can-have-package)
          - [156. What is Cargo?](#156-what-is-cargo)
          - [157. How create package?](#157-how-create-package)
          - [158. what structure of package directory created 'cargo new'?](#158-what-structure-of-package-directory-created-cargo-new)
          - [159. How cargo understands what a package contain binary crate?](#159-how-cargo-understands-what-a-package-contain-binary-crate)
          - [160. How cargo understands what a package contain library crate?](#160-how-cargo-understands-what-a-package-contain-library-crate)
          - [161. How a package can have multiple binary crate?](#161-how-a-package-can-have-multiple-binary-crate)
      - [7.2 Defining Modules to Control Scope and Privacy](#72-defining-modules-to-control-scope-and-privacy)
          - [162. What is first a compiler does when it compiles a crate?](#162-what-is-first-a-compiler-does-when-it-compiles-a-crate)
          - [163. Where compiler look for module code for module declared in crate root, i.e. src/lib.rs or src/main.rs?](#163-where-compiler-look-for-module-code-for-module-declared-in-crate-root-ie-srclibrs-or-srcmainrs)
          - [164. Where compiler look for module code for module declared in any file other than crate root, i.e. code for submodule?](#164-where-compiler-look-for-module-code-for-module-declared-in-any-file-other-than-crate-root-ie-code-for-submodule)
          - [165. When and How we can refer to code in module?](#165-when-and-how-we-can-refer-to-code-in-module)
          - [166. How to do within module public?](#166-how-to-do-within-module-public)
          - [167. For what is used `use` keyword?](#167-for-what-is-used-use-keyword)
          - [168. For what is used modules?](#168-for-what-is-used-modules)
          - [169. For what is used private items?](#169-for-what-is-used-private-items)
          - [170. For what is make modules and the items within them public.](#170-for-what-is-make-modules-and-the-items-within-them-public)
          - [171. How we can create library crate?](#171-how-we-can-create-library-crate)
          - [172. How we can structure crate?](#172-how-we-can-structure-crate)
          - [173. Why `src/main.rs` and `src/lib.rs` are called crate roots?](#173-why-srcmainrs-and-srclibrs-are-called-crate-roots)
          - [174. What is module tree?](#174-what-is-module-tree)
          - [175. What does means that some modules a *siblings*?](#175-what-does-means-that-some-modules-a-siblings)
          - [176. What does means that some module a child of other module?](#176-what-does-means-that-some-module-a-child-of-other-module)
          - [177. What does means that some module a parent of other module?](#177-what-does-means-that-some-module-a-parent-of-other-module)
      - [7.3 Paths for Referring to an Item in the Module Tree](#73-paths-for-referring-to-an-item-in-the-module-tree)
          - [178. For what using Paths?](#178-for-what-using-paths)
          - [179. What forms does Path have?](#179-what-forms-does-path-have)
          - [180. What is absolute path?](#180-what-is-absolute-path)
          - [181. What is relative path?](#181-what-is-relative-path)
          - [182. How to choose whether to use a relative or absolute path?](#182-how-to-choose-whether-to-use-a-relative-or-absolute-path)
          - [183. What a items in Rust?](#183-what-a-items-in-rust)
          - [184. What is the default visibility of items in Rust](#184-what-is-the-default-visibility-of-items-in-rust)
          - [185. Can child items use the items it their ancestor modules?](#185-can-child-items-use-the-items-it-their-ancestor-modules)
          - [186. What make item private?](#186-what-make-item-private)
          - [187. How  to expose inner parts of child modules’ code?](#187-how--to-expose-inner-parts-of-child-modules-code)
          - [188. How to construct relative paths that begin in the parent module?](#188-how-to-construct-relative-paths-that-begin-in-the-parent-module)
          - [189. what are the default fields of a structure?](#189-what-are-the-default-fields-of-a-structure)
          - [190. How to create an struct instance from struct whit a private fields?](#190-how-to-create-an-struct-instance-from-struct-whit-a-private-fields)
          - [191. what are the default enum variants?](#191-what-are-the-default-enum-variants)
          - [192. How to make enum variants public?](#192-how-to-make-enum-variants-public)
      - [7.4 Bringing Paths into Scope with the use Keyword](#74-bringing-paths-into-scope-with-the-use-keyword)
          - [193. Why use `use` keyword?](#193-why-use-use-keyword)
          - [194. How do I make a name obtained with the "use" keyword available to code in another scope?](#194-how-do-i-make-a-name-obtained-with-the-use-keyword-available-to-code-in-another-scope)
      - [How bringing two items with the same name into scope with `use` statements?](#how-bringing-two-items-with-the-same-name-into-scope-with-use-statements)
          - [195. How to use External Packages?](#195-how-to-use-external-packages)
          - [196. How we can bring multiple items defined in the same crate or same module into scope by using one line?](#196-how-we-can-bring-multiple-items-defined-in-the-same-crate-or-same-module-into-scope-by-using-one-line)
          - [197. When we can use 'self' into 'use' statement?](#197-when-we-can-use-self-into-use-statement)
          - [198. How we can brings all public items defined in path into scope?](#198-how-we-can-brings-all-public-items-defined-in-path-into-scope)
      - [Separating Modules into Different Files](#separating-modules-into-different-files)
          - [199. How we can extract module defined in file to its own file?](#199-how-we-can-extract-module-defined-in-file-to-its-own-file)
          - [200. How Rust package system allow you organize program code?](#200-how-rust-package-system-allow-you-organize-program-code)
    - [8. Common Collections](#8-common-collections)
          - [201. How unique are collections compared to other types?](#201-how-unique-are-collections-compared-to-other-types)
          - [202. What difference between collections and array and tuple?](#202-what-difference-between-collections-and-array-and-tuple)
          - [203. What is Vector collection?](#203-what-is-vector-collection)
          - [204. What is String collection?](#204-what-is-string-collection)
          - [205. What is Hash Map collection?](#205-what-is-hash-map-collection)
      - [8.1 Storing Lists of Values with Vectors](#81-storing-lists-of-values-with-vectors)
          - [206. How create vector instance?](#206-how-create-vector-instance)
          - [207. How update a Vector?](#207-how-update-a-vector)
          - [208. How we can to read Elements of Vectors?](#208-how-we-can-to-read-elements-of-vectors)
          - [209. What is difference between reference vector value by index and by means `get` method?](#209-what-is-difference-between-reference-vector-value-by-index-and-by-means-get-method)
          - [210. In what cases did we used a reference to vector value by index?](#210-in-what-cases-did-we-used-a-reference-to-vector-value-by-index)
          - [211. In what cases did we used a reference to vector value by means `get` method?](#211-in-what-cases-did-we-used-a-reference-to-vector-value-by-means-get-method)
          - [212. Can we have immutable and mutable reference to vector value?](#212-can-we-have-immutable-and-mutable-reference-to-vector-value)
          - [213. How we can Iterating Over the immutable Values in a Vector?](#213-how-we-can-iterating-over-the-immutable-values-in-a-vector)
          - [214. How we can Iterating Over the mutable Values in a Vector?](#214-how-we-can-iterating-over-the-mutable-values-in-a-vector)
          - [215. Can we modify the entire vector while iterating over the vector?](#215-can-we-modify-the-entire-vector-while-iterating-over-the-vector)
          - [216. Can we store in vector values different types?](#216-can-we-store-in-vector-values-different-types)
          - [217. How we can store in vector values different types?](#217-how-we-can-store-in-vector-values-different-types)
          - [218. In case of using a vector with enum values holds different types, how can we handle these values?](#218-in-case-of-using-a-vector-with-enum-values-holds-different-types-how-can-we-handle-these-values)
          - [219. Where vector API?](#219-where-vector-api)
      - [8.2 Storing UTF-8 Encoded Text with Strings](#82-storing-utf-8-encoded-text-with-strings)
          - [220. What Is a String?](#220-what-is-a-string)
          - [221. How implemented String type?](#221-how-implemented-string-type)
          - [222. How create new String?](#222-how-create-new-string)
          - [223. How update a String?](#223-how-update-a-string)
          - [224. What happen when we perform String Concatenation with the + Operator?](#224-what-happen-when-we-perform-string-concatenation-with-the--operator)
          - [225. How `format!` macro works?](#225-how-format-macro-works)
          - [226. What is string `deref coercion`?](#226-what-is-string-deref-coercion)
          - [227. Can we access parts of a String using indexing syntax?](#227-can-we-access-parts-of-a-string-using-indexing-syntax)
          - [228. Why doesn't Rust allow you to index a string?](#228-why-doesnt-rust-allow-you-to-index-a-string)
          - [229. Can we slicing a String?](#229-can-we-slicing-a-string)
          - [230. How we can iterate over String by Char?](#230-how-we-can-iterate-over-string-by-char)
          - [231. How we can iterate over String by Bytes?](#231-how-we-can-iterate-over-string-by-bytes)
      - [8.3 Storing Keys with Associated Values in Hash Maps](#83-storing-keys-with-associated-values-in-hash-maps)
          - [232. What is Hash Maps?](#232-what-is-hash-maps)
          - [233. What are Hash Maps used for?](#233-what-are-hash-maps-used-for)
          - [234. How to create hash maps?](#234-how-to-create-hash-maps)
          - [235. How to access a value in Hash Map?](#235-how-to-access-a-value-in-hash-map)
          - [236. What type does the `get` method of Hash Map return?](#236-what-type-does-the-get-method-of-hash-map-return)
          - [237. How we can iterate over each key–value pair in a hash map?](#237-how-we-can-iterate-over-each-keyvalue-pair-in-a-hash-map)
          - [238. How Hash Map to process Ownership?](#238-how-hash-map-to-process-ownership)
          - [239. What happens if you insert a value into a hash map for an existing key?](#239-what-happens-if-you-insert-a-value-into-a-hash-map-for-an-existing-key)
          - [240. How insert a Key and Value Only If a Key Isn’t Present?](#240-how-insert-a-key-and-value-only-if-a-key-isnt-present)
          - [241. How to Update a Value Based on the Old Value?](#241-how-to-update-a-value-based-on-the-old-value)
          - [242. In what order does iteration occur in a hash map?](#242-in-what-order-does-iteration-occur-in-a-hash-map)
          - [243. What hashing function used in Hash Map?](#243-what-hashing-function-used-in-hash-map)
    - [9. Error Handling](#9-error-handling)
          - [244. What error categories exist in Rust?](#244-what-error-categories-exist-in-rust)
      - [9.1 Unrecoverable Errors with panic!](#91-unrecoverable-errors-with-panic)
          - [245. What is unrecoverable errors?](#245-what-is-unrecoverable-errors)
          - [246. What are alternative actions of Rust in case of panic?](#246-what-are-alternative-actions-of-rust-in-case-of-panic)
          - [247. How and why switch from unwinding to aborting?](#247-how-and-why-switch-from-unwinding-to-aborting)
          - [248. What ways to cause a panic in practice?](#248-what-ways-to-cause-a-panic-in-practice)
          - [249. What actions does Rust take when panic occurs?](#249-what-actions-does-rust-take-when-panic-occurs)
          - [250. what is backtrace?](#250-what-is-backtrace)
          - [251. How to read a backtrace?](#251-how-to-read-a-backtrace)
          - [252. what settings are needed to print the backtrace?](#252-what-settings-are-needed-to-print-the-backtrace)
      - [9.2 Recoverable Errors with Result](#92-recoverable-errors-with-result)
          - [253. What is recoverable error?](#253-what-is-recoverable-error)
          - [254. How does Rust program handle recoverable error?](#254-how-does-rust-program-handle-recoverable-error)
          - [255. What is enum Result type?](#255-what-is-enum-result-type)
          - [256. How recoverable error handled using Result type?](#256-how-recoverable-error-handled-using-result-type)
          - [257. What is the result of the `unwrap()` method?](#257-what-is-the-result-of-the-unwrap-method)
          - [258. What is the result of the `expect()` method?](#258-what-is-the-result-of-the-expect-method)
          - [259. What is Propagating Errors?](#259-what-is-propagating-errors)
          - [260. How we can Propagate Error?](#260-how-we-can-propagate-error)
          - [261. What does the `?` operator?](#261-what-does-the--operator)
          - [262. What happen when `Err` Result value have called `?` operator?](#262-what-happen-when-err-result-value-have-called--operator)
          - [263. What does the `fs::read_to_string` function?](#263-what-does-the-fsread_to_string-function)
          - [264. Can `?` operator automatically convert a Result to an Option or vice versa?](#264-can--operator-automatically-convert-a-result-to-an-option-or-vice-versa)
          - [265. What type can the main function return?](#265-what-type-can-the-main-function-return)
      - [9.3 To panic! or Not to panic!](#93-to-panic-or-not-to-panic)
          - [266. when call panic! and when return Result?](#266-when-call-panic-and-when-return-result)
    - [10 Generic Types, Traits, and Lifetimes](#10-generic-types-traits-and-lifetimes)
          - [267. What are generics for?](#267-what-are-generics-for)
          - [268. How to extract duplicate code?](#268-how-to-extract-duplicate-code)
      - [10.1 Generic Data Types](#101-generic-data-types)
          - [269. How to name type parameters?](#269-how-to-name-type-parameters)
          - [270. How define function that uses generics?](#270-how-define-function-that-uses-generics)
          - [271. What is parameter type Restriction?](#271-what-is-parameter-type-restriction)
          - [272. How define struct that uses generics?](#272-how-define-struct-that-uses-generics)
          - [273. How define enum that uses generics?](#273-how-define-enum-that-uses-generics)
          - [274. How define method that uses generics?](#274-how-define-method-that-uses-generics)
          - [275. How we can specify constraints on generic types when defining methods on the type?](#275-how-we-can-specify-constraints-on-generic-types-when-defining-methods-on-the-type)
          - [276. What is Monomorphization?](#276-what-is-monomorphization)
      - [10.2 Traits: Defining Shared Behavior](#102-traits-defining-shared-behavior)
          - [277. What is Trait for?](#277-what-is-trait-for)
          - [278. What determines the behavior of a type?](#278-what-determines-the-behavior-of-a-type)
          - [279. When types shares the same behavior?](#279-when-types-shares-the-same-behavior)
          - [280. Hwo in Rust define a shared behavior?](#280-hwo-in-rust-define-a-shared-behavior)
          - [281. How define Trait?](#281-how-define-trait)
          - [282. How a type implements a trait?](#282-how-a-type-implements-a-trait)
          - [283. How should we use a types that implement a trait?](#283-how-should-we-use-a-types-that-implement-a-trait)
          - [284. Can we implement external traits on external types?](#284-can-we-implement-external-traits-on-external-types)
          - [285. Can a trait contain an implementation of the method it defines?](#285-can-a-trait-contain-an-implementation-of-the-method-it-defines)
          - [286. What happen if a type implement trait whit default implemented methods](#286-what-happen-if-a-type-implement-trait-whit-default-implemented-methods)
          - [287. Can default implemented trait methods call other methods of the trait?](#287-can-default-implemented-trait-methods-call-other-methods-of-the-trait)
          - [288. How to call the default implementation from an overriding implementation of that same method?](#288-how-to-call-the-default-implementation-from-an-overriding-implementation-of-that-same-method)
          - [289. How type of argument can accept function parameter annotated by trait type?](#289-how-type-of-argument-can-accept-function-parameter-annotated-by-trait-type)
          - [290. What syntaxes used to define functions that accept many types?](#290-what-syntaxes-used-to-define-functions-that-accept-many-types)
          - [291. How to use `impl trait_name` syntax to define functions that accept many different types?](#291-how-to-use-impl-trait_name-syntax-to-define-functions-that-accept-many-different-types)
          - [292. How to use Trait Bound Syntax to define functions that accept many different types?](#292-how-to-use-trait-bound-syntax-to-define-functions-that-accept-many-different-types)
          - [293. How to use Trait in defining a function's return type?](#293-how-to-use-trait-in-defining-a-functions-return-type)
          - [294. What can we Conditionally Implement Methods by Using Trait Bounds?](#294-what-can-we-conditionally-implement-methods-by-using-trait-bounds)
          - [295. What is blanket implementations?](#295-what-is-blanket-implementations)
      - [10.3 Validating References with Lifetimes](#103-validating-references-with-lifetimes)
          - [296. What is lifetime?](#296-what-is-lifetime)
          - [297. What is mean - reference is valid?](#297-what-is-mean---reference-is-valid)
          - [298. When we must annotate a Lifetime?](#298-when-we-must-annotate-a-lifetime)
          - [299. What main aim of lifetimes?](#299-what-main-aim-of-lifetimes)
          - [300. What does Borrow Checker do?](#300-what-does-borrow-checker-do)
          - [301. What is mean when function return borrowed value (reference)?](#301-what-is-mean-when-function-return-borrowed-value-reference)
          - [302. When we must annotate return value of function by lifetime parameter?](#302-when-we-must-annotate-return-value-of-function-by-lifetime-parameter)
          - [303. Can have  parameters of function different reference lifetime?](#303-can-have--parameters-of-function-different-reference-lifetime)
          - [304. What describe Lifetime annotations?](#304-what-describe-lifetime-annotations)
          - [305. What syntax have Lifetime annotation?](#305-what-syntax-have-lifetime-annotation)
          - [306. How to use lifetime annotations in function signatures?](#306-how-to-use-lifetime-annotations-in-function-signatures)
          - [307. What means  If the reference returned from function does not refer to one of the parameters?](#307-what-means--if-the-reference-returned-from-function-does-not-refer-to-one-of-the-parameters)
          - [308. How we can define struct whit field contained reference?](#308-how-we-can-define-struct-whit-field-contained-reference)
          - [309. Can we specify lifetime parameters for every functions or structs that use references?](#309-can-we-specify-lifetime-parameters-for-every-functions-or-structs-that-use-references)
          - [310. What is lifetime elision rules?](#310-what-is-lifetime-elision-rules)
          - [311. What is Input lLifetimes?](#311-what-is-input-llifetimes)
          - [312. What is Output Lifetimes?](#312-what-is-output-lifetimes)
          - [313. How compiler analysis of references in context of recognition lifetime annotations patterns?](#313-how-compiler-analysis-of-references-in-context-of-recognition-lifetime-annotations-patterns)
          - [314. What annotate lifetime in Method Definitions?](#314-what-annotate-lifetime-in-method-definitions)
          - [315. What is Static Lifetime?](#315-what-is-static-lifetime)
          - [316. What Lifetime have string literal?](#316-what-lifetime-have-string-literal)
          - [317. How used Generic Type Parameters, Trait Bounds, and Lifetimes Together?](#317-how-used-generic-type-parameters-trait-bounds-and-lifetimes-together)
    - [11 Writing Automated Tests](#11-writing-automated-tests)
      - [11.1 How to Write Tests](#111-how-to-write-tests)
          - [318. What is tests?](#318-what-is-tests)
          - [319. What perform body of test function?](#319-what-perform-body-of-test-function)
          - [320. What is Attribute](#320-what-is-attribute)
          - [321. How from function make test function?](#321-how-from-function-make-test-function)
          - [322. How we run tests?](#322-how-we-run-tests)
          - [323. What happen when we run tests with the cargo test command?](#323-what-happen-when-we-run-tests-with-the-cargo-test-command)
          - [324. What happen in testing context when we make a new library project with Cargo?](#324-what-happen-in-testing-context-when-we-make-a-new-library-project-with-cargo)
          - [325. Can we have a non-test function in a test module?](#325-can-we-have-a-non-test-function-in-a-test-module)
          - [326. When tests fail?](#326-when-tests-fail)
          - [327. What is the `assert!` macro used for?](#327-what-is-the-assert-macro-used-for)
          - [328. What is the `assert_eq!` and `assert_ne!` Macros used for?](#328-what-is-the-assert_eq-and-assert_ne-macros-used-for)
          - [329. How to add custom  Custom Failure Messages?](#329-how-to-add-custom--custom-failure-messages)
          - [330. How we can test that our code handles error conditions as we expect?](#330-how-we-can-test-that-our-code-handles-error-conditions-as-we-expect)
          - [331. What needs to be done to make `should_panic` tests more precise?](#331-what-needs-to-be-done-to-make-should_panic-tests-more-precise)
          - [332. How we can use Result type for testing our code?](#332-how-we-can-use-result-type-for-testing-our-code)
      - [11.2 Controlling How Tests Are Run](#112-controlling-how-tests-are-run)
          - [333. How default behavior of the binary produced by `cargo test`?](#333-how-default-behavior-of-the-binary-produced-by-cargo-test)
          - [334. How to change default `cargo test` behavior?](#334-how-to-change-default-cargo-test-behavior)
          - [335. How to separate command line options go to cargo test, and those that go to the resultant test binary](#335-how-to-separate-command-line-options-go-to-cargo-test-and-those-that-go-to-the-resultant-test-binary)
          - [336. How by default Cargo run test?](#336-how-by-default-cargo-run-test)
          - [337. How to run tests consistently?](#337-how-to-run-tests-consistently)
          - [338. What we should do if wont to see printed values for passing tests?](#338-what-we-should-do-if-wont-to-see-printed-values-for-passing-tests)
          - [339. How we can Running Single Tests?](#339-how-we-can-running-single-tests)
          - [340. How to Filtering to Run Multiple Tests?](#340-how-to-filtering-to-run-multiple-tests)
          - [341. How to Ignoring Some Tests?](#341-how-to-ignoring-some-tests)
          - [342. How we can run only tests marked as `ignored`?](#342-how-we-can-run-only-tests-marked-as-ignored)
          - [343. How we can run all tests include marked as `ignored`?](#343-how-we-can-run-all-tests-include-marked-as-ignored)
      - [11.3 Test Organization](#113-test-organization)
          - [344. What purpose of unit tests?](#344-what-purpose-of-unit-tests)
          - [345. What convention fo organization unit tests?](#345-what-convention-fo-organization-unit-tests)
          - [346. How role of `#[cfg(test)]` annotation?](#346-how-role-of-cfgtest-annotation)
          - [347. Should to test Private Functions?](#347-should-to-test-private-functions)
          - [348. Does allow Rust to test of Private Function?](#348-does-allow-rust-to-test-of-private-function)
          - [349. What is purpose of integration tests?](#349-what-is-purpose-of-integration-tests)
          - [350. Where are located integration tests?](#350-where-are-located-integration-tests)
          - [351. How many files whit integration tests we can create?](#351-how-many-files-whit-integration-tests-we-can-create)
          - [352. How Cargo compile files whit integration tests?](#352-how-cargo-compile-files-whit-integration-tests)
          - [353. Should we annotate any code in integration tests with `#[cfg(test)]`?](#353-should-we-annotate-any-code-in-integration-tests-with-cfgtest)
          - [354. How we can run a particular integration test function?](#354-how-we-can-run-a-particular-integration-test-function)
          - [355. How we can run all function in particular integration test file?](#355-how-we-can-run-all-function-in-particular-integration-test-file)
          - [356. How we can make shared code for integrated tests?](#356-how-we-can-make-shared-code-for-integrated-tests)
          - [357. How can we make integration testing of binary crates?](#357-how-can-we-make-integration-testing-of-binary-crates)
    - [12 An I/O Project: Building a Command Line Program](#12-an-io-project-building-a-command-line-program)
      - [12.1 Accepting Command Line Arguments](#121-accepting-command-line-arguments)
          - [358. How we can pass command line arguments our program when running `cargo run`?](#358-how-we-can-pass-command-line-arguments-our-program-when-running-cargo-run)
          - [359. Where we can look for existing libraries for our needs?](#359-where-we-can-look-for-existing-libraries-for-our-needs)
          - [360. Which Rust standard library function can we use to read the values ​​of command line arguments?](#360-which-rust-standard-library-function-can-we-use-to-read-the-values-of-command-line-arguments)
          - [361. What does the `args().collect()` method do?](#361-what-does-the-argscollect-method-do)
      - [12.2 Reading a File](#122-reading-a-file)
          - [362. How we can read file to string?](#362-how-we-can-read-file-to-string)
      - [12.3 Refactoring to Improve Modularity and Error Handling](#123-refactoring-to-improve-modularity-and-error-handling)
          - [363. Why refactor?](#363-why-refactor)
          - [364. What is main Rust pattern about separating concerns?](#364-what-is-main-rust-pattern-about-separating-concerns)
          - [365. How we can do refactoring?](#365-how-we-can-do-refactoring)
      - [12.4 Developing the Library’s Functionality with Test-Driven Development](#124-developing-the-librarys-functionality-with-test-driven-development)
          - [366. What is TDD?](#366-what-is-tdd)
          - [367. How Write a Failing Test?](#367-how-write-a-failing-test)
          - [368. How write code to pass the test?](#368-how-write-code-to-pass-the-test)
          - [369. Hwo Using the search Function in the run Function?](#369-hwo-using-the-search-function-in-the-run-function)
      - [12.5 Working with Environment Variables](#125-working-with-environment-variables)
          - [370. What module contain features for dealing with environment variable?](#370-what-module-contain-features-for-dealing-with-environment-variable)
      - [12.6 Writing Error Messages to Standard Error Instead of Standard Output](#126-writing-error-messages-to-standard-error-instead-of-standard-output)
          - [371. How make what our program print error massages to Standard Error Instead of Standard Output?](#371-how-make-what-our-program-print-error-massages-to-standard-error-instead-of-standard-output)
    - [13 Functional Language Features: Iterators and Closures](#13-functional-language-features-iterators-and-closures)
      - [13.1 Closures: Anonymous Functions that Capture Their Environment](#131-closures-anonymous-functions-that-capture-their-environment)
          - [372. What is Closures?](#372-what-is-closures)
          - [373. Should we annotate the types of the parameters or return value of Closures?](#373-should-we-annotate-the-types-of-the-parameters-or-return-value-of-closures)
          - [374. Why we do not require annotate the types of the parameters or return value of Closures?](#374-why-we-do-not-require-annotate-the-types-of-the-parameters-or-return-value-of-closures)
          - [375. Can we annotate the types of the parameters or return value of Closures?](#375-can-we-annotate-the-types-of-the-parameters-or-return-value-of-closures)
          - [376. How define Closure?](#376-how-define-closure)
          - [377. What compiler determine parameters and return types of Closure?](#377-what-compiler-determine-parameters-and-return-types-of-closure)
          - [378. How Closure capture environment values?](#378-how-closure-capture-environment-values)
          - [379. How does Closure determine what capture methods to use?](#379-how-does-closure-determine-what-capture-methods-to-use)
          - [380. What we should do whit ownership when passing a closure to a new thread?](#380-what-we-should-do-whit-ownership-when-passing-a-closure-to-a-new-thread)
          - [381. What closure body can do whit captured value?](#381-what-closure-body-can-do-whit-captured-value)
          - [382. What does it depend the way a closure captures and handles values from the environment?](#382-what-does-it-depend-the-way-a-closure-captures-and-handles-values-from-the-environment)
          - [383. What does it depend what kinds of closures can use functions and struct?](#383-what-does-it-depend-what-kinds-of-closures-can-use-functions-and-struct)
          - [384. Must we declare which traits must implement the closure?](#384-must-we-declare-which-traits-must-implement-the-closure)
          - [385. Which traits can implement closure?](#385-which-traits-can-implement-closure)
          - [386. Which trait must implement closure that moves captured values out of its body?](#386-which-trait-must-implement-closure-that-moves-captured-values-out-of-its-body)
          - [387. Which trait must implement closure that don’t move captured values out of their body, but that might mutate the captured values?](#387-which-trait-must-implement-closure-that-dont-move-captured-values-out-of-their-body-but-that-might-mutate-the-captured-values)
          - [388. Which trait must implement closure that don’t move captured values out of their body and that don’t mutate captured values, as well as capture nothing from their environment?](#388-which-trait-must-implement-closure-that-dont-move-captured-values-out-of-their-body-and-that-dont-mutate-captured-values-as-well-as-capture-nothing-from-their-environment)
      - [13.2 Processing a Series of Items with Iterators](#132-processing-a-series-of-items-with-iterators)
          - [389. What is the iterator pattern used for?](#389-what-is-the-iterator-pattern-used-for)
          - [390. What is means - iterators are lazy?](#390-what-is-means---iterators-are-lazy)
          - [391. What is Iterator in Rust?](#391-what-is-iterator-in-rust)
          - [392. What method define Iterator Trait?](#392-what-method-define-iterator-trait)
          - [393. How can we get immutable references to values ​​in vector using iterator syntax?](#393-how-can-we-get-immutable-references-to-values-in-vector-using-iterator-syntax)
          - [394. How can we get mutable references to values ​​in vector using iterator syntax?](#394-how-can-we-get-mutable-references-to-values-in-vector-using-iterator-syntax)
          - [395. How can we get ownership of vector type and returns owned values using iterator syntax?](#395-how-can-we-get-ownership-of-vector-type-and-returns-owned-values-using-iterator-syntax)
          - [396. What is 'consuming adapters' methods?](#396-what-is-consuming-adapters-methods)
          - [397. How the `sum` Iterator method works](#397-how-the-sum-iterator-method-works)
          - [398. What is 'Iterator adapters' methods?](#398-what-is-iterator-adapters-methods)
          - [399. How the `map` Iterator method works?](#399-how-the-map-iterator-method-works)
          - [400. How we must combine 'Iterator adapters' and 'consuming adapters' method?](#400-how-we-must-combine-iterator-adapters-and-consuming-adapters-method)
          - [401. Can we Using Closures that Capture Their Environment in iterators?](#401-can-we-using-closures-that-capture-their-environment-in-iterators)
          - [402. How the `filter` Iterator method works?](#402-how-the-filter-iterator-method-works)
      - [13.3 Improving Our I/O Project](#133-improving-our-io-project)
      - [13.4 Comparing Performance: Loops vs. Iterators](#134-comparing-performance-loops-vs-iterators)
          - [403. What code implementation faster on: `for loop` or Iterators?](#403-what-code-implementation-faster-on-for-loop-or-iterators)
          - [404. What is 'zero-cost abstractions'?](#404-what-is-zero-cost-abstractions)
    - [14 More About Cargo and Crates.io](#14-more-about-cargo-and-cratesio)
      - [14.1 Customizing Builds with Release Profiles](#141-customizing-builds-with-release-profiles)
          - [405. What is 'release profiles'?](#405-what-is-release-profiles)
          - [406. What release profiles exist?](#406-what-release-profiles-exist)
          - [407. What happen if we add `[profile.*]` sections for any profile?](#407-what-happen-if-we-add-profile-sections-for-any-profile)
          - [408. What controls the `opt-level` profile setting?](#408-what-controls-the-opt-level-profile-setting)
      - [14.2 Publishing a Crate to Crates.io](#142-publishing-a-crate-to-cratesio)
          - [409. what are documentation comments for?](#409-what-are-documentation-comments-for)
          - [410. how are documentation comments pointed?](#410-how-are-documentation-comments-pointed)
          - [411. what markup can be used in documentation comments?](#411-what-markup-can-be-used-in-documentation-comments)
          - [412. what sections can be used in documentation?](#412-what-sections-can-be-used-in-documentation)
          - [413. How we can tests code in documentation comments?](#413-how-we-can-tests-code-in-documentation-comments)
          - [414. how to create a doc comment that does not refer to a specific code?](#414-how-to-create-a-doc-comment-that-does-not-refer-to-a-specific-code)
          - [415. How to remove the internal organization from the public AP?](#415-how-to-remove-the-internal-organization-from-the-public-ap)
          - [416. How to Setting Up a Crates.io Account?](#416-how-to-setting-up-a-cratesio-account)
          - [417. How to Publishing a Crate to Crates.io?](#417-how-to-publishing-a-crate-to-cratesio)
          - [418. How Publishing a New Version of an Existing Crate?](#418-how-publishing-a-new-version-of-an-existing-crate)
          - [419. what are the versification rules,](#419-what-are-the-versification-rules)
          - [420. How to prevent any future projects from adding Deprecating Crate Versions as a new dependency?](#420-how-to-prevent-any-future-projects-from-adding-deprecating-crate-versions-as-a-new-dependency)
          - [421. What is 'yanking a crate version'?](#421-what-is-yanking-a-crate-version)
      - [14.3 Cargo Workspaces](#143-cargo-workspaces)
          - [422. What is Cargo Workspace?](#422-what-is-cargo-workspace)
          - [423. How to create a Workspace?](#423-how-to-create-a-workspace)
          - [424. How to create package in Workspace?](#424-how-to-create-package-in-workspace)
          - [425. What we can build Workspace?](#425-what-we-can-build-workspace)
          - [426. Which file and directories does `cargo build` create in Workspace?](#426-which-file-and-directories-does-cargo-build-create-in-workspace)
          - [427. How many packages we can create in Workspace?](#427-how-many-packages-we-can-create-in-workspace)
          - [428. What files and directories shares all packages in Workspace?](#428-what-files-and-directories-shares-all-packages-in-workspace)
          - [429. What should we do if our container code depends on code from another Workspace package?](#429-what-should-we-do-if-our-container-code-depends-on-code-from-another-workspace-package)
          - [430. How we should run binary crate in Workspace?](#430-how-we-should-run-binary-crate-in-workspace)
          - [431. How we should add dependencies in Workspace packages?](#431-how-we-should-add-dependencies-in-workspace-packages)
          - [432. Where located Cargo.lock file of Workspace package?](#432-where-located-cargolock-file-of-workspace-package)
          - [433. What happen If crates in the workspace specify incompatible versions of the same dependency?](#433-what-happen-if-crates-in-the-workspace-specify-incompatible-versions-of-the-same-dependency)
          - [434. How we can run tests in Workspace?](#434-how-we-can-run-tests-in-workspace)
          - [435. How we should publish Workspace crate?](#435-how-we-should-publish-workspace-crate)
      - [14.5 Installing Binaries with cargo install](#145-installing-binaries-with-cargo-install)
          - [436. For what used `cargo install` command?](#436-for-what-used-cargo-install-command)
          - [437. How we can install a binary cartes locally?](#437-how-we-can-install-a-binary-cartes-locally)
          - [438. What is 'binary target'?](#438-what-is-binary-target)
          - [439. Where is information about crate target?](#439-where-is-information-about-crate-target)
          - [440. Where are a binaries installed with `cargo install` stored?](#440-where-are-a-binaries-installed-with-cargo-install-stored)
      - [14.6 Extending Cargo with Custom Commands](#146-extending-cargo-with-custom-commands)
          - [441. How we can extend Cargo with new subcommands without having to modify Cargo?](#441-how-we-can-extend-cargo-with-new-subcommands-without-having-to-modify-cargo)
    - [15 Smart Pointers.](#15-smart-pointers)
          - [442. What is a Pointer?](#442-what-is-a-pointer)
          - [443. How Pointers implemented in Rust?](#443-how-pointers-implemented-in-rust)
          - [444. What is 'Smart Pointers'?](#444-what-is-smart-pointers)
          - [445. How Smart Pointers implemented in Rust?](#445-how-smart-pointers-implemented-in-rust)
          - [446. What role `Deref` trait in Smart pointers?](#446-what-role-deref-trait-in-smart-pointers)
          - [447. What role `Drop` trait in Smart pointers?](#447-what-role-drop-trait-in-smart-pointers)
      - [15.1 Using `Box<T>` to Point to Data on the Heap](#151-using-boxt-to-point-to-data-on-the-heap)
          - [448. What is `Box<T>` type?](#448-what-is-boxt-type)
          - [449. Why use `Box<T>`?](#449-why-use-boxt)
          - [450. How define Box value?](#450-how-define-box-value)
          - [451. What is recursive type?](#451-what-is-recursive-type)
          - [452. Why Recursive types pose an issue?](#452-why-recursive-types-pose-an-issue)
          - [453. How does Box solve issue of Recursive types?](#453-how-does-box-solve-issue-of-recursive-types)
          - [454. What is Cons List?](#454-what-is-cons-list)
          - [455. How Rust determine how much space to allocate for a Enum?](#455-how-rust-determine-how-much-space-to-allocate-for-a-enum)
          - [456. How to define Cons List by using Enum?](#456-how-to-define-cons-list-by-using-enum)
      - [15.2 Treating Smart Pointers Like Regular References with the Deref Trait](#152-treating-smart-pointers-like-regular-references-with-the-deref-trait)
          - [457. What is Dereference operator?](#457-what-is-dereference-operator)
          - [458. What types can we apply the dereference operator to?](#458-what-types-can-we-apply-the-dereference-operator-to)
          - [459. How Rust dereference Deref implementing types?](#459-how-rust-dereference-deref-implementing-types)
          - [460. Whether the '\*' operator is applied recursively to values ​​returned from the `deref` method?](#460-whether-the--operator-is-applied-recursively-to-values-returned-from-the-deref-method)
          - [461. What is 'Deref coercion'?](#461-what-is-deref-coercion)
          - [462. Where used 'Deref coercion'?](#462-where-used-deref-coercion)
          - [463. How we can override `*` operator on mutable reference?](#463-how-we-can-override--operator-on-mutable-reference)
          - [464. What result type of Deref Coercion for \&T?](#464-what-result-type-of-deref-coercion-for-t)
          - [465. What result type of Deref Coercion for mut\& T?](#465-what-result-type-of-deref-coercion-for-mut-t)
      - [15.3 Running Code on Cleanup with the Drop Trait](#153-running-code-on-cleanup-with-the-drop-trait)
          - [466. For what to use Drop Trait?](#466-for-what-to-use-drop-trait)
          - [467. what is required to implement Drop trait?](#467-what-is-required-to-implement-drop-trait)
          - [468. How is the `drop` method of the Drop feature called?](#468-how-is-the-drop-method-of-the-drop-feature-called)
          - [469. How can we manually drop a value?](#469-how-can-we-manually-drop-a-value)
      - [15.4 `Rc<T>`, the Reference Counted Smart Pointer](#154-rct-the-reference-counted-smart-pointer)
          - [470. when a single value might have multiple owners?](#470-when-a-single-value-might-have-multiple-owners)
          - [471. How we can enable multiple ownership?](#471-how-we-can-enable-multiple-ownership)
          - [472. What does `Rc<T>` type?](#472-what-does-rct-type)
          - [473. Can we use `Rc<T>` in multi-threaded scenarios?](#473-can-we-use-rct-in-multi-threaded-scenarios)
          - [474. How we can use `Rc<T>` to Share Data?](#474-how-we-can-use-rct-to-share-data)
      - [RefCell and the Interior Mutability Pattern](#refcell-and-the-interior-mutability-pattern)
          - [475. What is 'Interior mutability'?](#475-what-is-interior-mutability)
          - [476. How implemented the Interior mutability pattern?](#476-how-implemented-the-interior-mutability-pattern)
          - [477. What is 'unsafe code'?](#477-what-is-unsafe-code)
          - [478. When can we use Interior mutability pattern?](#478-when-can-we-use-interior-mutability-pattern)
          - [479. What difference between references, `Box<T>` and `RefCell<T>`?](#479-what-difference-between-references-boxt-and-refcellt)
          - [480. What could be the advantage of checking the borrowing rules at runtime?](#480-what-could-be-the-advantage-of-checking-the-borrowing-rules-at-runtime)
          - [481. When the `RefCell<T>` type is useful?](#481-when-the-refcellt-type-is-useful)
          - [482. Can we use `RefCell<T>` type in multi-thread scenarios?](#482-can-we-use-refcellt-type-in-multi-thread-scenarios)
          - [483. How we can use `RefCell<T>` type to mutate immutable value.](#483-how-we-can-use-refcellt-type-to-mutate-immutable-value)
          - [484. How `RefCell<T>` keeping Track of Borrows at Runtime?](#484-how-refcellt-keeping-track-of-borrows-at-runtime)
          - [485. How get a value that can have multiple owners and that we can mutate?](#485-how-get-a-value-that-can-have-multiple-owners-and-that-we-can-mutate)
          - [486. what is the thread-safe version of `RefCell<T>`?](#486-what-is-the-thread-safe-version-of-refcellt)
      - [15.6 Reference Cycles Can Leak Memory](#156-reference-cycles-can-leak-memory)
          - [487. What is `memory leak`?](#487-what-is-memory-leak)
          - [488. What situation in Rust does create 'memory leak'?](#488-what-situation-in-rust-does-create-memory-leak)
          - [489. How can we avoid memory leaks by using `Rc<T>` and `RefCell<T>`?](#489-how-can-we-avoid-memory-leaks-by-using-rct-and-refcellt)
          - [490. How we can organize our data structures that have reference cycles so avoid memory leaks?](#490-how-we-can-organize-our-data-structures-that-have-reference-cycles-so-avoid-memory-leaks)
          - [491. How we can access a value that a `Weak<T>` is pointing to?](#491-how-we-can-access-a-value-that-a-weakt-is-pointing-to)
          - [492. Where get more information about to implement your own smart pointers?](#492-where-get-more-information-about-to-implement-your-own-smart-pointers)
    - [16 Fearless Concurrency](#16-fearless-concurrency)
          - [493. What is Concurrent programming?](#493-what-is-concurrent-programming)
          - [494. What is Parallel programming?](#494-what-is-parallel-programming)
      - [16.1 Using Threads to Run Code Simultaneously](#161-using-threads-to-run-code-simultaneously)
          - [495. What is threads?](#495-what-is-threads)
          - [496. What are the benefits of using multiple threads?](#496-what-are-the-benefits-of-using-multiple-threads)
          - [497. What are the problems of using multiple threads?](#497-what-are-the-problems-of-using-multiple-threads)
          - [498. What is Race conditions?](#498-what-is-race-conditions)
          - [499. What is Deadlocks?](#499-what-is-deadlocks)
          - [500. What create a new thread?](#500-what-create-a-new-thread)
          - [501. What happen whit spawned threads when main thread  completes?](#501-what-happen-whit-spawned-threads-when-main-thread--completes)
          - [502. How can we guarantee that a spawned thread will completely finish its execution?](#502-how-can-we-guarantee-that-a-spawned-thread-will-completely-finish-its-execution)
          - [503. What mean Blocking a thread?](#503-what-mean-blocking-a-thread)
          - [504. How stop current thread execution for a short duration?](#504-how-stop-current-thread-execution-for-a-short-duration)
          - [505. How we should use any data from the main thread in the spawned thread’s code?](#505-how-we-should-use-any-data-from-the-main-thread-in-the-spawned-threads-code)
      - [16.2 Using Message Passing to Transfer Data Between Threads](#162-using-message-passing-to-transfer-data-between-threads)
          - [506. What is `Message Passing` concurrency?](#506-what-is-message-passing-concurrency)
          - [507. How `Message Passing` implemented in Rust?](#507-how-message-passing-implemented-in-rust)
          - [508. What is 'Channels'?](#508-what-is-channels)
          - [509. How create Chanel for multiple producer and single consumer (mpsc)?](#509-how-create-chanel-for-multiple-producer-and-single-consumer-mpsc)
          - [510. How can we organize thread communication using mpsc Channel?](#510-how-can-we-organize-thread-communication-using-mpsc-channel)
          - [511. In Channel, is it possible to reuse a value in the sender code after it has been sent?](#511-in-channel-is-it-possible-to-reuse-a-value-in-the-sender-code-after-it-has-been-sent)
          - [512. How we can send multiple values in mpsc Channel?](#512-how-we-can-send-multiple-values-in-mpsc-channel)
          - [513. How we can use multiply produsers whit mpsc Cannel?](#513-how-we-can-use-multiply-produsers-whit-mpsc-cannel)
      - [16.3 Shared-State Concurrency](#163-shared-state-concurrency)
          - [514. What is Mutex?](#514-what-is-mutex)
          - [515. How create Mutex?](#515-how-create-mutex)
          - [516. How Sharing a `Mutex<T>` Between Multiple Threads?](#516-how-sharing-a-mutext-between-multiple-threads)
          - [517. How does a thread access data inside a Mutex?](#517-how-does-a-thread-access-data-inside-a-mutex)
          - [518. What is `Arc<T>`?](#518-what-is-arct)
          - [519. What is Atomics?](#519-what-is-atomics)
          - [520. Way having immutable `Mutex<T>`  value we could get a mutable reference to the value inside it?](#520-way-having-immutable-mutext--value-we-could-get-a-mutable-reference-to-the-value-inside-it)
          - [521. What is deadlock?](#521-what-is-deadlock)
      - [16.4 Extensible Concurrency with the Sync and Send Traits.](#164-extensible-concurrency-with-the-sync-and-send-traits)
          - [522. For what used The Send marker trait?](#522-for-what-used-the-send-marker-trait)
          - [523. Are `Rc<T>` is `Send`?](#523-are-rct-is-send)
          - [524. Does we marked as Send Any type composed entirely of Send types?](#524-does-we-marked-as-send-any-type-composed-entirely-of-send-types)
          - [525. What primitive types are Send?](#525-what-primitive-types-are-send)
          - [526. For what used The Sync marker trait?](#526-for-what-used-the-sync-marker-trait)
          - [527. Does we marked as Sync Any type composed entirely of Sync types?](#527-does-we-marked-as-sync-any-type-composed-entirely-of-sync-types)
          - [528. What primitive types are Sync?](#528-what-primitive-types-are-sync)
          - [529. How we can manually implement Send and Sync type?](#529-how-we-can-manually-implement-send-and-sync-type)
    - [17 Fundamentals of Asynchronous Programming: Async, Await, Futures, and Streams](#17-fundamentals-of-asynchronous-programming-async-await-futures-and-streams)
          - [530. What techniques are for working on more than one operation at a time?](#530-what-techniques-are-for-working-on-more-than-one-operation-at-a-time)
          - [531. What is CPU-bound or compute-bound operation?](#531-what-is-cpu-bound-or-compute-bound-operation)
          - [532. What is IO-bound operation?](#532-what-is-io-bound-operation)
          - [533. What is concurrency?](#533-what-is-concurrency)
          - [534. What is parallelism?](#534-what-is-parallelism)
          - [535. What is serial?](#535-what-is-serial)
      - [17.1 Futures and the Async Syntax](#171-futures-and-the-async-syntax)
          - [536. What is key elements of asynchronous programming in Rust?](#536-what-is-key-elements-of-asynchronous-programming-in-rust)
          - [537. What is Future in Rust asynchronous programming?](#537-what-is-future-in-rust-asynchronous-programming)
          - [538. How to use `async` keyword?](#538-how-to-use-async-keyword)
          - [539. In what places of code async function or block can be paused and resumed.](#539-in-what-places-of-code-async-function-or-block-can-be-paused-and-resumed)
          - [540. What called process of checking with a Future to see if its value is available yet?](#540-what-called-process-of-checking-with-a-future-to-see-if-its-value-is-available-yet)
          - [541. How to use `await` keyword?](#541-how-to-use-await-keyword)
          - [542. What is `trpl` crate?](#542-what-is-trpl-crate)
          - [543. What is `futures` crate?](#543-what-is-futures-crate)
          - [544. What is Tokio in Rust ?](#544-what-is-tokio-in-rust-)
          - [545. How to define `async` function?](#545-how-to-define-async-function)
          - [546. How Rust compile async function?](#546-how-rust-compile-async-function)
          - [547. What is required for run async code?](#547-what-is-required-for-run-async-code)
          - [548. What is Async Runtime?](#548-what-is-async-runtime)
      - [17.2 Applying Concurrency with Async](#172-applying-concurrency-with-async)
          - [549. How create a New async Task with `trpl::spawn_task`?](#549-how-create-a-new-async-task-with-trplspawn_task)
          - [550. How create and run multiple async task?](#550-how-create-and-run-multiple-async-task)
          - [551. How Passing Messages between Futures (async tasks)?](#551-how-passing-messages-between-futures-async-tasks)
          - [552. Can we use `for` loop over an asynchronous series of items?](#552-can-we-use-for-loop-over-an-asynchronous-series-of-items)
          - [553. How we can iterate over asynchronous series of items?](#553-how-we-can-iterate-over-asynchronous-series-of-items)
          - [554. What is `while let` conditional loop?](#554-what-is-while-let-conditional-loop)
      - [17.3 Working with Any Number of Futures](#173-working-with-any-number-of-futures)
          - [555. How we can run any number of async Task (Futures) the same type?](#555-how-we-can-run-any-number-of-async-task-futures-the-same-type)
          - [556. Can we run any number of async Task (Futures) different types?](#556-can-we-run-any-number-of-async-task-futures-different-types)
          - [557. How we can get only one future result from many futures?](#557-how-we-can-get-only-one-future-result-from-many-futures)
          - [558. In what order async runtime `race` run futures passed in as arguments?](#558-in-what-order-async-runtime-race-run-futures-passed-in-as-arguments)
          - [559. How we can yield control from a long-running task to the Runtime?](#559-how-we-can-yield-control-from-a-long-running-task-to-the-runtime)
      - [17.4 Streams: Futures in Sequence](#174-streams-futures-in-sequence)
          - [560. What is Streams in async Rust?](#560-what-is-streams-in-async-rust)
          - [561. How we can create Stream from Iterator?](#561-how-we-can-create-stream-from-iterator)
          - [562. How we can create stream of messages?](#562-how-we-can-create-stream-of-messages)
          - [563. How we can merge streams?](#563-how-we-can-merge-streams)
      - [17.5 A Closer Look at the Traits for Async](#175-a-closer-look-at-the-traits-for-async)
          - [564. how Rust defines Future Trait?](#564-how-rust-defines-future-trait)
          - [565. How named Future’s associated type?](#565-how-named-futures-associated-type)
          - [566. What says Future’s associated type?](#566-what-says-futures-associated-type)
          - [567. What method define Future Trait?](#567-what-method-define-future-trait)
          - [568. Which takes and return the `poll` method of Future Trait?](#568-which-takes-and-return-the-poll-method-of-future-trait)
          - [569. how Rust defines Poll type?](#569-how-rust-defines-poll-type)
          - [570. What happen if caller call `pull` again after the future has returned Ready?](#570-what-happen-if-caller-call-pull-again-after-the-future-has-returned-ready)
          - [571. How Rust compile code that uses `await`?](#571-how-rust-compile-code-that-uses-await)
          - [572. What should Rust do when the future is still Pending?](#572-what-should-rust-do-when-the-future-is-still-pending)
          - [573. What is self-referential data types?](#573-what-is-self-referential-data-types)
          - [574. Way self-referential data types is unsafe?](#574-way-self-referential-data-types-is-unsafe)
          - [575. What is Unpin and !Unpin Traits?](#575-what-is-unpin-and-unpin-traits)
          - [576. What is Pin type?](#576-what-is-pin-type)
          - [577. What does it affect Pin type?](#577-what-does-it-affect-pin-type)
          - [578. Why we must wraps to Pin type a pointer-like types of Future for using it?](#578-why-we-must-wraps-to-pin-type-a-pointer-like-types-of-future-for-using-it)
          - [579. Should we `pin` directly awaiting future?](#579-should-we-pin-directly-awaiting-future)
          - [580. What is Stream trait?](#580-what-is-stream-trait)
          - [581. How named Stream’s associated type?](#581-how-named-streams-associated-type)
          - [582. Which method define Stream?](#582-which-method-define-stream)
          - [583. What type return `poll_next` method of Stream?](#583-what-type-return-poll_next-method-of-stream)
          - [584. What is StreamExt trait?](#584-what-is-streamext-trait)
      - [17.6  Putting It All Together: Futures, Tasks, and Threads](#176--putting-it-all-together-futures-tasks-and-threads)
          - [585. what rules should be followed when choosing between Async model and Treads?](#585-what-rules-should-be-followed-when-choosing-between-async-model-and-treads)
    - [18 Object-Oriented Programming Features of Rust](#18-object-oriented-programming-features-of-rust)
      - [18.1 Characteristics of Object-Oriented Languages](#181-characteristics-of-object-oriented-languages)
          - [586. Which Characteristics of Object-Oriented Languages?](#586-which-characteristics-of-object-oriented-languages)
          - [587. What is objects in OOP?](#587-what-is-objects-in-oop)
          - [588. How Rust implement OOP objects?](#588-how-rust-implement-oop-objects)
          - [589. What is encapsulation?](#589-what-is-encapsulation)
          - [590. How Rust implements encapsulation?](#590-how-rust-implements-encapsulation)
          - [591. What is inheritance?](#591-what-is-inheritance)
          - [592. How Rust implements inheritance?](#592-how-rust-implements-inheritance)
          - [593. How we can implement code reusing in Rust?](#593-how-we-can-implement-code-reusing-in-rust)
          - [594. What is Polymorphism?](#594-what-is-polymorphism)
          - [595. How Rust implements Polymorphism?](#595-how-rust-implements-polymorphism)
      - [18.2 Using Trait Objects That Allow for Values of Different Types](#182-using-trait-objects-that-allow-for-values-of-different-types)
          - [596. How create vector that store different types?](#596-how-create-vector-that-store-different-types)
          - [597. How implement common behavior (polymorphism) in Rust?](#597-how-implement-common-behavior-polymorphism-in-rust)
          - [598. What is trait object?](#598-what-is-trait-object)
          - [599. what is the difference in usage trait objects in place of a generic or concrete type?](#599-what-is-the-difference-in-usage-trait-objects-in-place-of-a-generic-or-concrete-type)
          - [600. What happen if we use values that don’t implement the traits that the trait objects need?](#600-what-happen-if-we-use-values-that-dont-implement-the-traits-that-the-trait-objects-need)
      - [18.3 Implementing an Object-Oriented Design Pattern](#183-implementing-an-object-oriented-design-pattern)
          - [601. What is state pattern?](#601-what-is-state-pattern)
          - [602. What is advantage of using state pattern?](#602-what-is-advantage-of-using-state-pattern)
    - [19 Patterns and Matching](#19-patterns-and-matching)
          - [603. What is Patterns?](#603-what-is-patterns)
      - [19.1 All the Places Patterns Can Be Used](#191-all-the-places-patterns-can-be-used)
          - [604. Where are used Patterns?](#604-where-are-used-patterns)
          - [605. How using Pattern in match Arms?](#605-how-using-pattern-in-match-arms)
          - [606. what is the mandatory requirement when using match Arms?](#606-what-is-the-mandatory-requirement-when-using-match-arms)
          - [607. What method are for make exhaustive requirement for match expressions?](#607-what-method-are-for-make-exhaustive-requirement-for-match-expressions)
          - [608. Which pattern can match anything?](#608-which-pattern-can-match-anything)
          - [609. What pattern can be used for ignore  any value not specified?](#609-what-pattern-can-be-used-for-ignore--any-value-not-specified)
          - [610. For what used `if let` Expressions?](#610-for-what-used-if-let-expressions)
          - [611. What are downside of using `if let` expressions?](#611-what-are-downside-of-using-if-let-expressions)
          - [612. For what used `while let` Conditional Loops?](#612-for-what-used-while-let-conditional-loops)
          - [613. How to used a pattern in `for` Loops?](#613-how-to-used-a-pattern-in-for-loops)
          - [614. How used pattern whit `let` Statements whit binging value?](#614-how-used-pattern-whit-let-statements-whit-binging-value)
          - [615. How is used patterns whit Function parameters?](#615-how-is-used-patterns-whit-function-parameters)
      - [19.2 Refutability: Whether a Pattern Might Fail to Match](#192-refutability-whether-a-pattern-might-fail-to-match)
          - [616. When patterns are irrefutable?](#616-when-patterns-are-irrefutable)
          - [617. When patterns are refutable?](#617-when-patterns-are-refutable)
          - [618. Which type of pattern can accept function parameters, `let` statements, and `for` loops?](#618-which-type-of-pattern-can-accept-function-parameters-let-statements-and-for-loops)
          - [619. Which type of pattern can accept `if let`, `while let` expressions and the `let-else` statement?](#619-which-type-of-pattern-can-accept-if-let-while-let-expressions-and-the-let-else-statement)
          - [620. Why a compiler warns against irrefutable patterns in `if let`, `while let` expressions and the `let-else` statement?](#620-why-a-compiler-warns-against-irrefutable-patterns-in-if-let-while-let-expressions-and-the-let-else-statement)
          - [621. How we can fix situation when we have a refutable pattern where an irrefutable pattern is needed?](#621-how-we-can-fix-situation-when-we-have-a-refutable-pattern-where-an-irrefutable-pattern-is-needed)
      - [19.3 Pattern Syntax](#193-pattern-syntax)
          - [622. How we can directly maths patterns match patterns against literals?](#622-how-we-can-directly-maths-patterns-match-patterns-against-literals)
          - [623. How we can use named variables in patterns to match values?](#623-how-we-can-use-named-variables-in-patterns-to-match-values)
          - [624. How we can match multiple patterns inside one match arm?](#624-how-we-can-match-multiple-patterns-inside-one-match-arm)
          - [625. What is pattern 'or' operator?](#625-what-is-pattern-or-operator)
          - [626. How we can Matching Ranges of Values?](#626-how-we-can-matching-ranges-of-values)
          - [627. How to destructure Struct?](#627-how-to-destructure-struct)
          - [628. How to destructure Enum?](#628-how-to-destructure-enum)
          - [629. How to destructure Nested Structs and Enums?](#629-how-to-destructure-nested-structs-and-enums)
          - [630. How to destructure mix of Structs and Tuples?](#630-how-to-destructure-mix-of-structs-and-tuples)
        - [Ignoring Values in a Pattern](#ignoring-values-in-a-pattern)
          - [631. Why is it sometimes necessary to ignore values ​​in a pattern?](#631-why-is-it-sometimes-necessary-to-ignore-values-in-a-pattern)
          - [632. How to ignore entire value in a pattern?](#632-how-to-ignore-entire-value-in-a-pattern)
          - [633. In which cases we can ignoring entire value in a pattern?](#633-in-which-cases-we-can-ignoring-entire-value-in-a-pattern)
          - [634. Why might we need to ignore a value in a function?](#634-why-might-we-need-to-ignore-a-value-in-a-function)
          - [635. How to ignore part of a value in patterns?](#635-how-to-ignore-part-of-a-value-in-patterns)
          - [636. Why might we need to ignore a unused Variable?](#636-why-might-we-need-to-ignore-a-unused-variable)
          - [637. How we can ignore a unused Variable?](#637-how-we-can-ignore-a-unused-variable)
          - [638. What difference between using underscore `_` and underscore whit variable name `_x`?](#638-what-difference-between-using-underscore-_-and-underscore-whit-variable-name-_x)
          - [639. How can we ignore Remaining Parts of a Value?](#639-how-can-we-ignore-remaining-parts-of-a-value)
        - [Extra Conditionals with Match Guards](#extra-conditionals-with-match-guards)
          - [640. What is *match guard*?](#640-what-is-match-guard)
          - [641. When allowed *match guard*?](#641-when-allowed-match-guard)
          - [642. How we can use match guards to solve pattern-shadowing problem?](#642-how-we-can-use-match-guards-to-solve-pattern-shadowing-problem)
          - [643. How we can use match guards whit 'or' operator `|`?](#643-how-we-can-use-match-guards-whit-or-operator-)
        - [@ Bindings](#-bindings)
          - [644. For what used *at* `@` Bindings operator in patterns?](#644-for-what-used-at--bindings-operator-in-patterns)
    - [Advanced Features](#advanced-features)
      - [20.1 Unsafe Rust](#201-unsafe-rust)
          - [645. What is Unsafe Rust?](#645-what-is-unsafe-rust)
          - [646. What is Unsafe Rust for?](#646-what-is-unsafe-rust-for)
          - [647. Why exists Unsafe Rust?](#647-why-exists-unsafe-rust)
        - [Unsafe Superpowers](#unsafe-superpowers)
          - [648. How switch to unsafe Rust?](#648-how-switch-to-unsafe-rust)
          - [649. There is the borrow checking in unsafe Rust?](#649-there-is-the-borrow-checking-in-unsafe-rust)
          - [650. What is intent of 'unsafe' block?](#650-what-is-intent-of-unsafe-block)
          - [651. What we call unsafe superpowers?](#651-what-we-call-unsafe-superpowers)
          - [652. What is Safe API?](#652-what-is-safe-api)
        - [Dereferencing a Raw Pointer](#dereferencing-a-raw-pointer)
          - [653. What is Raw Pointers?](#653-what-is-raw-pointers)
          - [654. What are the raw pointers?](#654-what-are-the-raw-pointers)
          - [655. How raw pointers are written?](#655-how-raw-pointers-are-written)
          - [656. What means 'immutable' in the context of raw pointers?](#656-what-means-immutable-in-the-context-of-raw-pointers)
          - [657. What different raw pointers from references and smart pointers?](#657-what-different-raw-pointers-from-references-and-smart-pointers)
          - [658. Can we create raw pointers outside `unsafe` block in safe code?](#658-can-we-create-raw-pointers-outside-unsafe-block-in-safe-code)
          - [659. What restrictions of using raw pointers in safe code?](#659-what-restrictions-of-using-raw-pointers-in-safe-code)
          - [660. How create raw pointer?](#660-how-create-raw-pointer)
          - [661. What is the danger of using raw pointers?](#661-what-is-the-danger-of-using-raw-pointers)
          - [662. Why would ever use raw pointers?](#662-why-would-ever-use-raw-pointers)
          - [663. What we can dereference raw pointers?](#663-what-we-can-dereference-raw-pointers)
        - [Calling an Unsafe Function or Method](#calling-an-unsafe-function-or-method)
          - [664. What is Unsafe Function?](#664-what-is-unsafe-function)
          - [665. How is an unsafe function indicated?](#665-how-is-an-unsafe-function-indicated)
          - [666. How call Unsafe Function?](#666-how-call-unsafe-function)
          - [667. How we must perform unsafe operations in the body of an unsafe function?](#667-how-we-must-perform-unsafe-operations-in-the-body-of-an-unsafe-function)
          - [668. Is the function unsafe if it contain unsafe code?](#668-is-the-function-unsafe-if-it-contain-unsafe-code)
          - [669. What is FFI?](#669-what-is-ffi)
          - [670. What is the `extern` Rust keyword used for?](#670-what-is-the-extern-rust-keyword-used-for)
          - [671. Way need declare `extern` block by `unsafe` keyword?](#671-way-need-declare-extern-block-by-unsafe-keyword)
          - [672. How to define an extern function defined in another language?](#672-how-to-define-an-extern-function-defined-in-another-language)
          - [673. How to call an extern function defined in another language?](#673-how-to-call-an-extern-function-defined-in-another-language)
          - [674. How call Rust Functions from Other Languages?](#674-how-call-rust-functions-from-other-languages)
          - [675. What is *Mangling*?](#675-what-is-mangling)
        - [Accessing or Modifying a Mutable Static Variable.](#accessing-or-modifying-a-mutable-static-variable)
          - [676. How create static variable?](#676-how-create-static-variable)
          - [677. What is Static Variables?](#677-what-is-static-variables)
          - [678. Way convention of naming static variables?](#678-way-convention-of-naming-static-variables)
          - [679. What value can store static variable?](#679-what-value-can-store-static-variable)
          - [680. What is differences static variables from constants?](#680-what-is-differences-static-variables-from-constants)
          - [681. Is it safe accessing and modifying mutable static variables?](#681-is-it-safe-accessing-and-modifying-mutable-static-variables)
          - [682. What is unsafe using mutable static variables?](#682-what-is-unsafe-using-mutable-static-variables)
          - [683. How we must access a mutable static variables?](#683-how-we-must-access-a-mutable-static-variables)
          - [684. How we should comment unsafe function?](#684-how-we-should-comment-unsafe-function)
          - [685. How we should comment unsafe operation?](#685-how-we-should-comment-unsafe-operation)
          - [686. How create reference to static mutable variable?](#686-how-create-reference-to-static-mutable-variable)
        - [Implementing an Unsafe Trait](#implementing-an-unsafe-trait)
          - [687. When Trait is unsafe?](#687-when-trait-is-unsafe)
          - [688. How declare unsafe Trait?](#688-how-declare-unsafe-trait)
        - [Accessing Fields of a Union](#accessing-fields-of-a-union)
          - [689. What is Union?](#689-what-is-union)
          - [690. How to access a Union fields?](#690-how-to-access-a-union-fields)
        - [Using Miri to check unsafe code](#using-miri-to-check-unsafe-code)
          - [691. What is Miri?](#691-what-is-miri)
          - [692. How Miri check unsafe code?](#692-how-miri-check-unsafe-code)
          - [693. What is required to use Miri?](#693-what-is-required-to-use-miri)
          - [694. How install Miri?](#694-how-install-miri)
          - [695. How run Miri?](#695-how-run-miri)
          - [696. Where deeper exploration of how to work effectively with unsafe Rust?](#696-where-deeper-exploration-of-how-to-work-effectively-with-unsafe-rust)
      - [20.2 Advanced Traits](#202-advanced-traits)
        - [Specifying Placeholder Types in Trait Definitions with Associated Types](#specifying-placeholder-types-in-trait-definitions-with-associated-types)
          - [697. What is Trait whit associated type?](#697-what-is-trait-whit-associated-type)
          - [698. What is used Trait whit associated type for?](#698-what-is-used-trait-whit-associated-type-for)
          - [699. How to define Trait whit associated type?](#699-how-to-define-trait-whit-associated-type)
          - [700. How implement Trait whit associated type?](#700-how-implement-trait-whit-associated-type)
        - [Default Generic Type Parameters and Operator Overloading](#default-generic-type-parameters-and-operator-overloading)
          - [701. Why can we specify a specific default type for a generic type?](#701-why-can-we-specify-a-specific-default-type-for-a-generic-type)
          - [702. How specify a default type when declaring a generic type?](#702-how-specify-a-default-type-when-declaring-a-generic-type)
        - [Fully Qualified Syntax for Disambiguation: Calling Methods with the Same Name](#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name)
          - [703. How we can call method that have the same name in different trait that is implemented by  type or in self implementation?](#703-how-we-can-call-method-that-have-the-same-name-in-different-trait-that-is-implemented-by--type-or-in-self-implementation)
          - [704. How we can call non-method function that have the same name in different implemented trait or in self implementation?](#704-how-we-can-call-non-method-function-that-have-the-same-name-in-different-implemented-trait-or-in-self-implementation)
          - [705. Which is general fully qualified syntax?](#705-which-is-general-fully-qualified-syntax)
        - [Using Supertraits to Require One Trait’s Functionality Within Another Trait](#using-supertraits-to-require-one-traits-functionality-within-another-trait)
          - [706. What is Supertrait?](#706-what-is-supertrait)
          - [707. How to define Supertrait?](#707-how-to-define-supertrait)
        - [Using the Newtype Pattern to Implement External Traits on External Types](#using-the-newtype-pattern-to-implement-external-traits-on-external-types)
          - [708. What is Newtype pattern used for?](#708-what-is-newtype-pattern-used-for)
          - [709. How use Newtype pattern for Implement External Traits on External Types?](#709-how-use-newtype-pattern-for-implement-external-traits-on-external-types)
      - [20.3 Advanced Types.](#203-advanced-types)
        - [Using the Newtype Pattern for Type Safety and Abstraction.](#using-the-newtype-pattern-for-type-safety-and-abstraction)
          - [710. What are the possibilities of using the Newtype pattern?](#710-what-are-the-possibilities-of-using-the-newtype-pattern)
        - [Creating Type Synonyms with Type Aliases.](#creating-type-synonyms-with-type-aliases)
          - [711. How create Type Synonyms?](#711-how-create-type-synonyms)
          - [712. What is Type Alias?](#712-what-is-type-alias)
        - [The Never Type that Never Returns.](#the-never-type-that-never-returns)
          - [713. What is Never Type?](#713-what-is-never-type)
          - [714. How denoted Never Type?](#714-how-denoted-never-type)
          - [715. What is *diverging functions*?](#715-what-is-diverging-functions)
          - [716. What use is a type you can never create values for?](#716-what-use-is-a-type-you-can-never-create-values-for)
        - [Dynamically Sized Types and the Sized Trait](#dynamically-sized-types-and-the-sized-trait)
          - [717. What is DST?](#717-what-is-dst)
          - [718. What is "unsized type"?](#718-what-is-unsized-type)
          - [719. What DSTs are there in Rust?](#719-what-dsts-are-there-in-rust)
          - [720. How we can use DST?](#720-how-we-can-use-dst)
          - [721. What is `Sized` trait?](#721-what-is-sized-trait)
          - [722. How we can provide DST as type arguments to generic type parameters?](#722-how-we-can-provide-dst-as-type-arguments-to-generic-type-parameters)
          - [723. Can we implement Trait for DSTs?](#723-can-we-implement-trait-for-dsts)
          - [724. Can a struct contain a DST?](#724-can-a-struct-contain-a-dst)
      - [20.4 Advanced Functions and Closures.](#204-advanced-functions-and-closures)
        - [Function Pointers](#function-pointers)
          - [725. Can you pass a function to a function?](#725-can-you-pass-a-function-to-a-function)
          - [726. What is Function pointer type?](#726-what-is-function-pointer-type)
          - [727. How we can pass a function to a function?](#727-how-we-can-pass-a-function-to-a-function)
          - [728. Can we specify `fn` as the parameter type directly?](#728-can-we-specify-fn-as-the-parameter-type-directly)
          - [729. Can we pass function pointer as an argument for a function that expects a closure?](#729-can-we-pass-function-pointer-as-an-argument-for-a-function-that-expects-a-closure)
          - [730. Can we used name of enum variant as closure to pass in to function?](#730-can-we-used-name-of-enum-variant-as-closure-to-pass-in-to-function)
        - [Returning Closures](#returning-closures)
          - [731. Can we return Closure directly?](#731-can-we-return-closure-directly)
          - [732. How we can return Closure from function?](#732-how-we-can-return-closure-from-function)
      - [20.5 Macros](#205-macros)
          - [733. What read about how to write macros?](#733-what-read-about-how-to-write-macros)
          - [734. What is macros?](#734-what-is-macros)
          - [735. The Difference Between Macros and Functions](#735-the-difference-between-macros-and-functions)
          - [736. What difference between Macros and Function?](#736-what-difference-between-macros-and-function)
        - [Declarative Macros with macro\_rules! for General Metaprogramming](#declarative-macros-with-macro_rules-for-general-metaprogramming)
          - [737. What is Declarative Macros?](#737-what-is-declarative-macros)
          - [738. How define a Declarative Macros?](#738-how-define-a-declarative-macros)
        - [Procedural Macros for Generating Code from Attributes](#procedural-macros-for-generating-code-from-attributes)
          - [739. What is Procedural Macro?](#739-what-is-procedural-macro)
          - [740. How is kinds of procedural macros?](#740-how-is-kinds-of-procedural-macros)
          - [741. How create procedural macros?](#741-how-create-procedural-macros)
        - [How to Write a Custom derive Macro](#how-to-write-a-custom-derive-macro)
          - [742. For what using derive Macro?](#742-for-what-using-derive-macro)
          - [743. How to Write a Custom derive Macro?](#743-how-to-write-a-custom-derive-macro)
          - [744. For what is used `proc_macro` crate?](#744-for-what-is-used-proc_macro-crate)
          - [745. For what is used `syn` crate?](#745-for-what-is-used-syn-crate)
          - [746. For what is used `quote` crate?](#746-for-what-is-used-quote-crate)
        - [Attribute-like macros](#attribute-like-macros)
          - [747. What is Attribute-like macros](#747-what-is-attribute-like-macros)
          - [748. How define and use Attribute-like macros?](#748-how-define-and-use-attribute-like-macros)
        - [Function-like macros](#function-like-macros)
          - [749. How define and use Function-like macros?](#749-how-define-and-use-function-like-macros)
    - [Final Project: Building a Multithreaded Web Server](#final-project-building-a-multithreaded-web-server)


# Roust

## The Rust API Guidelines.

<https://rust-lang.github.io/api-guidelines/>

## install

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

## THE RUST PROGRAMMING LANGUAGE 2nd Edition by Steve Klabnik and Carol Nichols

### 3. Common Programming Concepts

#### Variables and Mutability

###### 1. When a variable is immutable?

By default in Rust variables are immutable. Once a value is bound to a name, you can’t change that value. We get compile-time errors when we attempt to change a value that’s designated as immutable because this very situation can lead to bugs. If one part of our code operates on the assumption that a value will never change and another part of our code changes that value, it’s possible that the first part of the code won’t do what it was designed to do. Although variables are immutable by default, you can make them mutable by adding mut in front of the variable name.

###### 2. What is constant?

Constants are values that are bound to a name and are not allowed to change, but there are a few differences between constants and variables.

###### 3. How differense between constants and variables?

- you aren’t allowed to use `mut` with constants.
- You declare constants using the `const` keyword instead of the `let` keyword
- the type of the value must be annotated.
- The last difference is that constants may be set only to a constant expression, not the result of a value that could only be computed at runtime

###### 4. What Rust’s naming convention for constants? 

Rust’s naming convention for constants is to use all uppercase with underscores between words.

###### 5. When Constants are valid?

Constants are valid for the entire time a program runs, within the scope in which they were declared.


###### 6. What is Shadowing?

you can declare a new variable with the same name as a previous variable. We say that the first variable is shadowed by the second, which means that the second variable is what the compiler will see when you use the name of the variable. We can shadow a variable by using the same variable’s name and repeating the use of the let keyword.

###### 7. What different Shadowing from marking mut?

Shadowing is different from marking a variable as mut because we’ll get a compile-time error if we accidentally try to reassign to this variable without using the let keyword

The other difference between `mut` and `shadowing` is that because we’re effectively creating a new variable when we use the let keyword again, we can change the type of the value but reuse the same name.

#### Data Types

###### 8. What means data types?

Every value in Rust is of a certain data type, which tells Rust what kind of data is being specified so it knows how to work with that data

###### 9. What subsets of data types are there in rust?

In rust a two data type subsets: scalar and compound

###### 10. What means that rust is statically typed language?

This means that it must know the types of all variables at compile time.  

###### 11. How declared types in Rust?

The compiler can usually infer what type we want to use based on the value and how we use it. In cases when many types are possible we must add a type annotation.

###### 12. What is scalar data types?

scalar data types is subset of rust data types which includes:

- integers numbers,
- floating-point numbers, 
- Booleans
- characters

###### 13. What is integer data type?

An integer is a number without a fractional component.

###### 14. What are there integers data types?

- 8-bit	i8 u8
- 16-bit i16 u16
- 32-bit i32 u32
- 64-bit i64 u64
- 128-bit i128 u128
- arch isize usize

###### 15. What means Signed and Unsigned integer data type?

Signed and unsigned refer to whether it’s possible for the number to be negative—in other words, whether the number needs to have a sign with it (signed) or whether it will only ever be positive and can therefore be represented without a sign (unsigned).

###### 16. How many value does it contain signed integer data types?

Each signed variant can store numbers from -(2^(n - 1)) to 2^(n - 1)-1 (two to the power of n minus one) inclusive, where n is the number of bits that variant uses

###### 17. How many value does it contain unsigned integer data types?

Each unsigned variant can store numbers from 0 to 2^n-1 inclusive, where n is the number of bits that variant uses

###### 18. what length are they `isize` and `usize` types? 

length `isize` and `usize` types depend on the architecture of the computer your program is running on, which is denoted in the table as “arch”: 64 bits if you’re on a 64-bit architecture and 32 bits if you’re on a 32-bit architecture

###### 19. what is the default integer data type in Rust?

If the integer data type is not specified, Rust uses default i32

###### 20. What is integer overflow?

Let’s say you have a variable of type u8 that can hold values between 0 and 255. If you try to change the variable to a value outside that range, such as 256, integer overflow will occur, which can result in one of two behaviors. When you’re compiling in debug mode, Rust includes checks for integer overflow that cause your program to panic at runtime if this behavior occurs. Rust uses the term panicking when a program exits with an error;

When you’re compiling in release mode with the --release flag, Rust does not include checks for integer overflow that cause panics. Instead, if overflow occurs, Rust performs two’s complement wrapping. In short, values greater than the maximum value the type can hold “wrap around” to the minimum of the values the type can hold. In the case of a u8, the value 256 becomes 0, the value 257 becomes 1, and so on. The program won’t panic, but the variable will have a value that probably isn’t what you were expecting it to have. 

###### 21. What method are used to explicitly handle the possibility of integer overflow?

- Wrap in all modes with the `wrapping_*` methods, such as `wrapping_add`.
- Return the `None` value if there is overflow with the `checked_*` methods.
- Return the `value` and a `boolean` indicating whether there was overflow with the `overflowing_*` methods.
- Saturate at the value’s minimum or maximum values with the `saturating_*` methods.

###### 22. What is floating-point data type?

floating-point data type are numbers with decimal points. Rust’s floating-point types are f32 and f64, which are 32 bits and 64 bits in size, respectively. 

###### 23. what is the default floating-point data type in Rust? 

The default floating-point is f64 because on modern CPUs, it’s roughly the same speed as f32 but is capable of more precision. 

###### 24. Signed or unsigned floating-point types? 

All floating-point types are signed.

###### 25. What is boolean data type?

a Boolean type in Rust has two possible values: `true` and `false`, is specified using `bool`, Booleans are one byte in size.

###### 26. What is char data type?

Rust’s char type is four bytes in size and represents a Unicode Scalar Value. We specify char literals with single quotes,

###### 27. What is compound data types?

Compound types can group multiple values into one type. Rust has two primitive compound types: tuples and arrays.

###### 28. What is tuple data type?

A tuple is a general way of grouping together a number of values with a variety of types into one compound type. Tuples have a fixed length: once declared, they cannot grow or shrink in size.

We create a tuple by writing a comma-separated list of values inside parentheses. Each position in the tuple has a type, and the types of the different values in the tuple don’t have to be the same.

###### 29. What is pattern matching data type?

This is hte way destructure a tuple value, like this:

```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

###### 30. How to get access to tuple value?

We can use pattern matching or by using a period (.) followed by index of the value we want to access.

###### 31. What is it called tuple  without any values?

tuple  without any values called `unit`. This value and its corresponding type are both written () and represent an empty value or an empty return type. Expressions implicitly return the unit value if they don’t return any other value.

###### 32. what do expressions return f they don’t return any other value.

Expressions implicitly return the unit value if they don’t return any other value.

###### 33. What is Array type?

Array is a way to have a collection of multiple values. Unlike a tuple, every element of an array must have the same type. Unlike arrays in some other languages, arrays in Rust have a fixed length.

Arrays are useful when you want your data allocated on the stack, rather than the heap or when you want to ensure you always have a fixed number of elements.

Arrays are more useful when you know the number of elements will not need to change.

###### 34. How create array?

- list values ​​in square brackets
  `let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];`
- write an array’s type using square brackets with the type of each element, a semicolon, and then the number of elements in the array, like so:
  `let a: [i32; 5] = [1, 2, 3, 4, 5];`
- initialize an array to contain the same value for each element by specifying the initial value, followed by a semicolon, and then the length of the array in square brackets, as shown here `let a = [3; 5];`

###### 35. How Accessing Array Elements?

An array is a single chunk of memory of a known, fixed size that can be allocated on the stack. You can access elements of an array using indexing, like this:

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

#### Functions

###### 36. What is the entry point in program in Rust

`main` function is the entry point of many programs.

###### 37. How to define function

We define a function in Rust by entering fn followed by a function name and a set of parentheses. The curly brackets tell the compiler where the function body begins and ends.

###### 38. How to write correctly function name?

Rust code uses snake case as the conventional style for function and variable names, in which all letters are lowercase and underscores separate words

###### 39. How to call function

We can call any function we’ve defined by entering its name followed by a set of parentheses.

###### 40. What is parameters function?

Parameters are special variables that are part of a function’s signature, separated by commas. When a function has parameters, you can provide it with concrete values for those parameters. Technically, the concrete values are called arguments, but in casual conversation, people tend to use the words parameter and argument interchangeably for either the variables in a function’s definition or the concrete values passed in when you call a function.

In function signatures, you must declare the type of each parameter.

#### Statements and Expressions

###### 41. What is Statement and Expression

- Statements are instructions that perform some action and do not return a value.
  
  ```rust
  fn main() { // function definition are statement
      let y = 6; // Creating a variable and assigning a value to it with the let keyword is a statement
  }
  ```

- Expressions evaluate to a resultant value
  - a math operation, such as 5 + 6, which is an expression that evaluates to the value 11.
  - Calling a function is an expression. 
  - Calling a macro is an expression. 
  - A new scope block created with curly brackets is an expression

  ```rust
  fn main() {
    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {y}");
  }
  ```

  This expression:

  ```
  {
    let x = 3;
    x + 1
  }
  ```

  - Expressions do not include ending semicolons. If you add a semicolon to the end of an expression, you turn it into a statement, and it will then not return a value

###### 42. How function return values?

  1. Functions can return values to the code that calls them. 
  2. We don’t name return values, but we must declare their type after an arrow (->). 
  3. In Rust, the return value of the function is synonymous with the value of the final expression in the block of the body of a function. 
  4. You can return early from a function by using the `return` keyword and specifying a value, but most functions return the last expression implicitly.
  
  ```rust
  fn five() -> i32 {
    5 //is the function’s return value, which is why the return type is i32
  }

  fn main() {
      let x = five();

      println!("The value of x is: {x}");
  }
  ```

  ```rust
  fn main() {
    let x = plus_one(5);

    println!("The value of x is: {x}");
  }

  fn plus_one(x: i32) -> i32 {
      x + 1 //f we place a semicolon at the end of the line containing x + 1, changing it from an expression to a statement, we’ll get an error
  }
  ```

  5. By default function return `()` - empty tuple

#### Comments

###### 43. How in Rust write comment?

comment starts with two slashes, and the comment continues until the end of the line. For comments that extend beyond a single line, you’ll need to include // on each line

comment can be on new line or be placed at the end of lines containing code

Rust also has another kind of comment, documentation comments

#### Control Flow - If expression

###### 44. what is "If" expression used for?

An if expression allows you to branch your code depending on conditions. if expressions start with the keyword if, followed by a condition. In this case, the condition checks whether or not the variable number has a value less than 5. We place the block of code to execute if the condition is true immediately after the condition inside curly brackets. Blocks of code associated with the conditions in if expressions are sometimes called arms, just like the arms in match expressions

Optionally, we can also include an else expression, which we chose to do here, to give the program an alternative block of code to execute should the condition evaluate to false. If you don’t provide an else expression and the condition is false, the program will just skip the if block and move on to the next bit of code.

It’s also worth noting that the condition in this code must be a bool. If the condition isn’t a bool, we’ll get an error.

```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

###### 45. Can use If expression in  let statement?

Because if is an expression, and therefore return value, we can use it on the right side of a let statement to assign the outcome to a variable.  Values that have the potential to be results from each arm of the if must be the same type

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

#### Control Flow - Loops

###### 46. what are Loops needed for

It’s often useful to execute a block of code more than once

###### 47. what types of iterations are there in Rust

- loop
- while
- for

###### 48. what is "loop" keyword used for?

The `loop` keyword tells Rust to execute a block of code over and over again forever or until you explicitly tell it to stop.

```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

###### 49. how stop execution `loop`?

You can place the `break` keyword within the loop to tell the program when to stop executing the loop

###### 50. how to continue a `loop` from the beginning at a certain point?

used `continue`, which in a loop tells the program to skip over any remaining code in this iteration of the loop and go to the next iteration.


###### 51. How return value from `loop`

add the value you want returned after the break expression you use to stop the loop; that value will be returned out of the loop so you can use it

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {result}");
}
```

You can also `return` from inside a loop. While `break` only exits the current loop, return always exits the current function.

###### 52. How use Labels in Loops?

If you have loops within loops, `break` and `continue` apply to the innermost loop at that point. You can optionally specify a `loop label` on a loop that you can then use with break or continue to specify that those keywords apply to the labeled loop instead of the innermost loop. Loop labels must begin with a single quote. Here’s an example with two nested loops:

```rust
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```

The first `break` that doesn’t specify a label will exit the inner loop only. The `break 'counting_up`; statement will exit the outer loop

###### 53. how can i implement conditional iteration - while

conditional iteration can implement by using a combination of `loop`, `if`, `else`, and `break` or by using `while` language construct

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

While a condition evaluates to true, the code runs; otherwise, it exits the loop.

###### 54. how can i implement iteration of collection of elements - for

iteration over collection elements cat implement by using `loop`, `if`, `else`, and `break` set or by using `while` language construct changing the index counter at each iteration. But a more convenient way are using a `for` loop and execute some code for each item in a collection

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```

###### 55. countdown example by using `for` loop

```rust
fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```

### 4. Understanding Ownership

###### 56. What concepts ensure memory safety in Rust programs at compile time

ownership, borrowing, and slices 

#### Ownership

###### 57. Why do you need to manage memory?

The program operates on data during execution. The data that the program operates on is stored in memory. Depending on the nature of the data, there are two types of storage: stack and heap.
In stack the execution data of the functions are stored as stack frames. Each frame is a block of space where the data required for that function is stored. For example, every time a function declares a new variable, it is "pushed" onto the topmost block in the stack. Then every time a function exits, the topmost block is cleared, thus all of the variables pushed onto the stack by that function, are cleared. The size of the data stored on the stack must be known at compile time.
Typical data that are stored on stack are local variables(value types or primitives, primitive constants), pointers and function frames.

If the size of the data operated by the program is not known at the compilation stage, the data will be allocated in the heap. When you put data on the heap, you request a certain amount of space. The memory allocator finds an empty spot in the heap that is big enough, marks it as being in use, and returns a pointer, which is the address of that location. This process is called allocating on the heap and is sometimes abbreviated as just allocating (pushing values onto the stack is not considered allocating). Because the pointer to the heap is a known, fixed size, you can store the pointer on the stack, but when you want the actual data, you must follow the pointer.
Unlike the stack, where memory space is freed automatically after a function exits, heap memory space must be cleared explicitly when the data stored in it is no longer needed, which is called "memory management".

###### 58. What's the difference between stack and heap

The stack stores values in the order it gets them and removes the values in the opposite order. This is referred to as last in, first out. Adding data is called pushing onto the stack, and removing data is called popping off the stack. All data stored on the stack must have a known, fixed size. Data with an unknown size at compile time or a size that might change must be stored on the heap instead.

The heap is less organized: when you put data on the heap, you request a certain amount of space. The memory allocator finds an empty spot in the heap that is big enough, marks it as being in use, and returns a pointer, which is the address of that location. This process is called allocating on the heap and is sometimes abbreviated as just allocating (pushing values onto the stack is not considered allocating). Because the pointer to the heap is a known, fixed size, you can store the pointer on the stack, but when you want the actual data, you must follow the pointer. 

Pushing to the stack is faster than allocating on the heap because the allocator never has to search for a place to store new data; that location is always at the top of the stack. Comparatively, allocating space on the heap requires more work because the allocator must first find a big enough space to hold the data and then perform bookkeeping to prepare for the next allocation.

Accessing data in the heap is slower than accessing data on the stack because you have to follow a pointer to get there. Contemporary processors are faster if they jump around less in memory.

When your code calls a function, the values passed into the function (including, potentially, pointers to data on the heap) and the function’s local variables get pushed onto the stack. When the function is over, those values get popped off the stack.

###### 59. What is Stack?

The stack is used for static memory allocation and as the name suggests it is a last in first out(LIFO) stack (Think of it as a stack of boxes).

- Due to this nature, the process of storing and retrieving data from the stack is very fast as there is no lookup required, you just store and retrieve data from the topmost block on it.
- But this means any data that is stored on the stack has to be finite and static(The size of the data is known at compile-time).
- This is where the execution data of the functions are stored as stack frames(So, this is the actual execution stack). Each frame is a block of space where the data required for that function is stored. For example, every time a function declares a new variable, it is "pushed" onto the topmost block in the stack. Then every time a function exits, the topmost block is cleared, thus all of the variables pushed onto the stack by that function, are cleared. These can be determined at compile time due to the static nature of the data stored here.
- Multi-threaded applications can have a stack per thread.
- Memory management of the stack is simple and straightforward and is done by the OS.
- Typical data that are stored on stack are local variables(value types or primitives, primitive constants), pointers and function frames.
- This is where you would encounter stack overflow errors as the size of the stack is limited compared to the Heap.
- There is a limit on the size of value that can be stored on the Stack for most languages.
  
###### 60. What is Heap?

Heap is used for dynamic memory allocation and unlike stack, the program needs to look up the data in heap using pointers (Think of it as a big multi-level library).

- It is slower than stack as the process of looking up data is more involved but it can store more data than the stack.
- This means data with dynamic size can be stored here.
- Heap is shared among threads of an application.
- Due to its dynamic nature heap is trickier to manage and this is where most of the memory management issues arise from and this is where the automatic memory management solutions from the language kick in.
- Typical data that are stored on the heap are global variables, reference types like objects, strings, maps, and other complex data structures.
- This is where you would encounter out of memory errors if your application tries to use more memory than the allocated heap(Though there are many other factors at play here like GC, compacting).
- Generally, there is no limit on the size of the value that can be stored on the heap. Of course, there is the upper limit of how much memory is allocated to the application.

###### 61. What are the methods of memory management?

Some languages have garbage collection that regularly looks for no-longer-used memory as the program runs; in other languages, the programmer must explicitly allocate and free the memory. Rust uses a third approach: memory is managed through a system of ownership with a set of rules that the compiler checks. If any of the rules are violated, the program won’t compile.

###### 62. What is the problem associated with memory management?

In most languages without a GC, it’s our responsibility to identify when memory is no longer being used and to call code to explicitly free it. Doing this correctly a difficult programming problem. If we forget, we’ll waste memory. If we do it too early, we’ll have an invalid variable. If we do it twice, that’s a bug too. We need to pair exactly one allocate with exactly one free.

###### 63. What Is Ownership?

Ownership is a set of rules that govern how a Rust program manages memory.

###### 64. Ownership Rules?

- Each value in Rust has an owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

###### 65. how does memory allocation happen in Rust?

We declare a variable and assign its value. The value can be simple or composite, i.e. consist of several values, but all value must be scalar, i.e. its size known at compile time, in this case the variable with its value is pushed into the stack, if the data is not scalar, dynamic, i.e. the size of the data is not known at compile time, then a request is made to the allocator and a reference to the area in the heap is placed into the stack.

###### 66. What is scope?

A scope is the range within a program for which an item is valid

###### 67. how does memory free happen in Rust?

When a variable goes out of scope, Rust calls a special method `drop`, it frees heep.
When we assign a completely new value to an existing variable, Rust will call drop and free the original value’s memory immediately.

###### 68. What happens when we assign a variable to another variable?

when one variable is assigned to another variable, a shallow copy of the first variable's value is created and bound to the second variable. If the variable's value includes a value or values ​​of dynamic types, i.e. types whose values ​​are stored on the heap, then the first variable becomes invalid and a reference to it further in the code causes a compilation error.

###### 69. What is Move?

when we assign a variable to another variable and the value of that variable is stored on the heap, a shallow copy is created, i.e. the stack data is copied, including pointers to the data on the heap, but the value on the heap is not copied, and rust marks the original variable as invalid, this process is called "Move" transfer ownership.

By by means of "Move" occurs transfer ownership.

###### 70. where in a code a variable is valid?

variable is valid from the point at which it’s declared until the end of the current scope or until it is assigned to another variable, if its value is stored on the heap

###### 71. What is ownership pattern?

assigning a value to another variable moves it. When a variable that includes data on the heap goes out of scope, the value will be cleaned up by drop unless ownership of the data has been moved to another variable.

###### 72. What do deep copy i.e. not only copy of stack data, bat heep data

we can use a method called `clone`

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {s1}, s2 = {s2}");
```

###### 73. what happens when we assign a variable whose value type implements the Copy trait, to another variable?

variables that use it do not move, but rather are trivially copied, making them still valid after assignment to another variable.

###### 74. what happens when we annotate a type with Copy if the type, or any of its parts, has implemented the Drop trait?

we’ll get a compile-time error

###### 75. What types implement the Copy trait?

A general rule: any group of simple scalar values can implement Copy, and nothing that requires allocation or is some form of resource can implement Copy. Here are some of the types that implement Copy:

- All the integer types, such as u32.
- The Boolean type, bool, with values true and false.
- All the floating-point types, such as f64.
- The character type, char.
- Tuples, if they only contain types that also implement Copy. For example, (i32, i32) implements Copy, but (i32, String) does not.

###### 76. What happen when we passing a value to a function?

Passing a variable to a function will move or copy, variable depending on the type of data bound to the variable, just as it happens with assignment

Returning values from function can also transfer ownership

#### References and Borrowing

###### 77. What is reference?

A reference is an address we can follow to access the data stored at that address; that data is owned by some other variable. Unlike a pointer, a reference is guaranteed to point to a valid value of a particular type for the life of that reference.

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{s1}' is {len}.");
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

###### 78. why do we need to pass a reference and not a value?

By means passing reference we do not transfer Ownership. We can refer to some value without taking ownership of it. Because reference does not own value, the value it points to will not be dropped when the reference stops being used. When functions have references as parameters instead of the actual values, we won’t need to return the values in order to give back ownership, because we never had ownership.


```rust
fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
} // Here, s goes out of scope. But because it does not have ownership of what
  // it refers to, it is not dropped.
```

###### 79. What is Borrowing?

creating a reference called borrowing

###### 80. what happens if we try to modify something we’re borrowing? 

```rust
fn main() {
    let s = String::from("hello");

    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}
```

Just as variables are immutable by default, so are references. We’re not allowed to modify something we have a reference to - we get a compile error.

###### 81. What needs to be done to create a mutable reference?

We must create variable whit keyword 'mut' and pass a reference whit '&mut' key.
a function that takes a mutable reference must declare the parameter type with &mut keyword

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

###### 82. What is a reference’s scope

a reference’s scope starts from where it is introduced and continues through the last time that reference is used

this code will compile because the last usage of the immutable references, the println!, occurs before the mutable reference is introduced:

```rust
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    println!("{r1} and {r2}");
    // variables r1 and r2 will not be used after this point

    let r3 = &mut s; // no problem
    println!("{r3}");
```

###### 83. What restriction have a mutable references?

if you have a mutable reference to a value, you can have no other references to that value within the scope of the first reference.

###### 84. What is a dangling pointer?

Dangling pointer—a pointer that references a location in memory that may have been given to someone else—by freeing some memory while preserving a pointer to that memory

###### 85. How the problem of dangling pointer solved in Rust?

In Rust, by contrast, the compiler guarantees that references will never be dangling references: if you have a reference to some data, the compiler will ensure that the data will not go out of scope before the reference to the data does.

```rust
fn dangle() -> &String { // dangle returns a reference to a String

    let s = String::from("hello"); // s is a new String

    &s // we return a reference to the String, s
} // Here, s goes out of scope, and is dropped. Its memory goes away.
  // Danger!
```

###### 86. Rules of References?

- At any given time, you can have either one mutable reference or any number of immutable references.
- References must always be valid.

#### The Slice Type

###### 87. What is Slice?

Slice are reference a contiguous sequence of elements in a collection.

###### 88. Does Slice have Ownership?

A slice is a kind of reference, so it does not have ownership.

###### 89. What is String Slices?

A string slice is a reference to part of a String, and it looks like this:

```rust
    let s = String::from("hello world");

    let hello = &s[0..5];
    let world = &s[6..11];
```

###### 90. How in Slice to start at index 0?

 drop the value before the two periods. In other words, these are equal:

```rust
let s = String::from("hello");

let slice = &s[0..2];
let slice = &s[..2];
```

###### 91. How to go to the last index in slice?

drop the trailing number. That means these are equal:

```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[3..len];
let slice = &s[3..];
```

###### 92. How to get all String in Slice?

drop both values to take a slice of the entire string. So these are equal:

```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[0..len];
let slice = &s[..];
```

###### 93. How  rewrite first_word to return a slice?

```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

###### 94. What type string literal?

```rust
//string literal type - string slice
&str
```

###### 95. How we can pass a String to string slice?

We can pass String to string slice as slice or as reference to the String

```rust
fn main() {
    let my_string = String::from("hello world");

    // `first_word` works on slices of `String`s, whether partial or whole
    let word = first_word(&my_string[0..6]);
    let word = first_word(&my_string[..]);
    // `first_word` also works on references to `String`s, which are equivalent
    // to whole slices of `String`s
    let word = first_word(&my_string);

    let my_string_literal = "hello world";

    // `first_word` works on slices of string literals, whether partial or whole
    let word = first_word(&my_string_literal[0..6]);
    let word = first_word(&my_string_literal[..]);

    // Because string literals *are* string slices already,
    // this works too, without the slice syntax!
    let word = first_word(my_string_literal);
}
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

### 5. Using Structs to Structure Related Data

###### 96. What is Struct?

A struct, or structure, is a custom data type that lets you package together and name multiple related values that make up a meaningful group.

#### 5.1 Defining and Instantiating Structs

###### 97. What is the similarity structs and tuples?

that both hold multiple related values. Like tuples, the pieces of a struct can be different types.

###### 98. What is the difference structs and tuples?

Unlike with tuples, in a struct you’ll name each piece of data so it’s clear what the values mean.

###### 99. How are structures over tuples more flexible?

Unlike with tuples, in a struct you’ll name each piece of data so it’s clear what the values mean. Adding these names means that structs are more flexible than tuples: you don’t have to rely on the order of the data to specify or access the values of an instance.

###### 100. How define Struct?

To define a struct, we enter the keyword struct and name the entire struct. A struct’s name should describe the significance of the pieces of data being grouped together. Then, inside curly brackets, we define the names and types of the pieces of data, which we call fields.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

###### 101. What are Struct fields?

The Struct fields are names with data type that are defined inside curly brackets

###### 102. How is defined Struct used?

after we’ve defined struct, we create an instance of that struct by specifying concrete values for each of the fields.

###### 103. How we create instance of the struct?

We create an instance by stating the name of the struct and then add curly brackets containing key: value pairs, where the keys are the names of the fields and the values are the data we want to store in those fields

```rust
fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}
```

###### 104. In what order do we specify field when creating struct?

We don’t have to specify the fields in the same order in which we declared them in the struct. We specify field in any order.


###### 105. How to get a specific value from a struct?

To get a specific value from a struct, we use dot notation

```rust
user1.email = String::from("anotheremail@example.com");
```

###### 106. What is needed to be able to change the value of the Struct field?

in order to be able to change the value of a field of a structure instance, the structure instance must be mutable

```rust
fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
}
```

###### 107. What is 'field init shorthand' syntax?

when we use the build function to create a struct instance, we must pass the struct instance field values ​​to the parameters of this function, which will later be assigned to the instance fields.

```rust
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username: username,
        email: email,
        sign_in_count: 1,
    }
}
```

If the instance field names and the function parameter names are the same, we may not set the corresponding values ​​opposite the structure instance field names.

```rust
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    }
}
```

###### 108. What is 'struct update' syntax?

It’s often useful to create a new instance of a struct that includes most of the values from another instance, but changes some

```rust
fn main() {
    // --snip--

    let user2 = User {
        active: user1.active,
        username: user1.username,
        email: String::from("another@example.com"),
        sign_in_count: user1.sign_in_count,
    };
}
```

Using struct update syntax, we can achieve the same effect with less code, The syntax .. specifies that the remaining fields not explicitly set should have the same value as the fields in the given instance.

```rust
fn main() {
    // --snip--

    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };
}
```

we specify the fields with new values ​​and then two dots with name of the instance of the struct the values of the fields which we want to use for the rest of the fields of the new instance.

If struct field data are heap-allocated it will be moved to fields of the new instance and sours struct instance will become invalid, it will not be possible to use it further.

###### 109. What is Tuple Structs?

Tuple structs have the added meaning the struct name provides but don’t have names associated with their fields; rather, they just have the types of the fields. Tuple structs are useful when you want to give the whole tuple a name and make the tuple a different type from other tuples, and when naming each field as in a regular struct would be verbose or redundant.

###### 110. How define Tuple Struct?

To define a tuple struct, start with the struct keyword and the struct name followed by the types in the tuple.

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

we cannot use instances of different structure types interchangeably even if they have the same element types

###### 111. What is Unit-Like Structs?

This is struct that don’t have any fields?

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

###### 112. How define Unit-Like Struct?

we use the struct keyword, the name we want, and then a semicolon

###### 113. What are Unit-Like Structs for?

Unit-like structs can be useful when you need to implement a trait on some type but don’t have any data that you want to store in the type itself

###### 114. Is it possible to create a structure that stores references to data that someone else owned?

It’s possible, but to do so requires the use of lifetimes. Lifetimes ensure that the data referenced by a struct is valid for as long as the struct is.

```rust
struct User {
    active: bool,
    username: &str,
    email: &str,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: "someusername123", //error: expected named lifetime parameter
        email: "someone@example.com", //error: expected named lifetime parameter
        sign_in_count: 1,
    };
}
```

#### 5.2 An Example Program Using Structs

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
```

###### 115. What means curly brackets in 'println!'?

the curly brackets tell println! to use formatting known as Display: output intended for direct end user consumption

###### 116. How we can add printing an instance of Struct while we’re debugging our program and see the values for all its fields?

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {}", rect1); // error[E0277]: `Rectangle` doesn't implement `std::fmt::Display`
}
```

we myst implement Display trait or Debug trait. In case implementing Debug trait we will use in `println!` macro  "{struct_var:?}" or "{struct_var:#?}" str

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {rect1:?}");
}
```

###### 117. How we can implement Display or Debug trait in Struct?

We must add the outer attribute `#[derive(Debug)]` just before the struct definition

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {rect1:?}");
}
```

###### 118. What is difference between `println!` and `dbg!` macro

- `dbg!` macro takes ownership of an expression as opposed to `println!`, which takes a reference, its prints the file and line number of where that `dbg!` macro call occurs in your code along with the resultant value of that expression, and returns ownership of the value.
- `dbg!` macro prints to the standard error console stream (stderr), as opposed to `println!`, which prints to the standard output console stream (stdout).
  
```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };

    dbg!(&rect1);
}
```

```sh
$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running `target/debug/rectangles`
[src/main.rs:10:16] 30 * scale = 60
[src/main.rs:14:5] &rect1 = Rectangle {
    width: 60,
    height: 50,
}
```

###### 119. What other attributes are there besides 'derive'?

for more information, [see the “Attributes” section of the Rust Reference](https://doc.rust-lang.org/reference/attributes.html)?

#### 5.3 Method Syntax

###### 120. What is a "Method"?

Methods are similar to functions: we declare them with the fn keyword and a name, they can have parameters and a return value, and they contain some code that’s run when the method is called from somewhere else. Unlike functions, methods are defined within the context of a struct (or an enum or a trait object), and their first parameter is always self, which represents the instance of the struct the method is being called on.

###### 121. How to define a method?

To define a method i.е. function within the context of Struct type, we start an `impl` (implementation) block for Struct type. Everything within this impl block will be associated with the Struct type we a defined. Then we move a function that we want define in context of Struct into the impl curly brackets and add the first parameter to be `self` in the signature and everywhere within the body.

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

###### 122. What difference using `&self` `&mut self` and `self` in method?

In case using `&self` we pass inside reference and therefore can only read data from struct instance.

In case using `&mut self` we pass muted reference and therefore can modify instance. In this case we myst create struct instance with `let mut` keyword

In case using `self` we pass ownership (make move). This technique is usually used when the method transforms self into something else and you want to prevent the caller from using the original instance after the transformation.

###### 123. Do we can use equal names for fields and methods in Struct?

We can use equal names for fields and methods in Struct. In this case  if we follow `var.name` with parentheses, Rust knows we mean the method width. When we don’t use parentheses, Rust knows we mean the field width.

```rust
impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}
```

###### 124. How called all functions defined in Struct impl block? 

All functions defined within an impl block are called associated functions because they’re associated with the type named after the impl

###### 125. Do can we create association function without self as first argument?

Yes. Associated functions that aren’t methods are often used for constructors that will return a new instance of the struct.

```rust
impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}
```

The Self keywords in the return type and in the body of the function are aliases for the type that appears after the impl keyword, which in this case is Rectangle.

###### 126. How do we call association function?

To call associated function, we use the `::` syntax with the struct name

```rust
 let sq = Rectangle::square(3);
```

is an example. This function is namespaced by the struct: the :: syntax is used for both associated functions and namespaces created by modules.

###### 127. How many impl Blocks can do have Struct? 

Each struct is allowed to have multiple impl blocks

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

### 6. Enums and Pattern Matching

###### 128. What is enum used for?

Enums allow you to define a type by enumerating its possible variants. enums give you a way of saying a value is one of a possible set of values. For example, we may want to say that Rectangle is one of a set of possible shapes that also includes Circle and Triangle

#### 6.1 Defining an Enum

###### 129. How define Enum?

We write keyword `enum` followed by name of enum and in curly brackets we list instance name of that enum.

```rust
enum IpAddrKind {
    V4,
    V6,
}
```

we can embed variety types in enum variant when define it. This can make in different ways

- named field, like a struct does
- one ore more types

in this cases we must pass relevant value to enum variant when creating it.

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

###### 130. what called enum instances?

enum variants

###### 131. How can we get an enum variant?

We write enum name, two colons and instance name

```rust
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
```

###### 132. Do can we used enum type as function parameter?

We can used enum type as any other type as function parameter

```rust
fn route(ip_kind: IpAddrKind) {}

route(IpAddrKind::V4);
route(IpAddrKind::V6);
```

###### 133. How we can define method in enum?

This is being done as with struct: impl followed enum name and curly brackets whit method definition. The body of the method would use 'self' to get the value that we called the method on.

###### 134. What is Null value?

Null value is value that currently invalid or absent for some reason.

###### 135. How in Rust implementing Null value?

In rust Null value implemented by using `enum Option<T>`. This enum encode the concept of a value being present or absent.

```rust
enum Option<T> {
    None,
    Some(T),
}
```

`enum Option<T>` have two variant None - that represent absent value; and Some(T) - that represent present value some type T. This variants included in prelude thus its not need bring into scope explicitly

###### 136. How do we can use Options variants?

```rust
    let some_number = Some(5);
    let some_char = Some('e');

    let absent_number: Option<i32> = None;
```

we can not annotate type of Some variable i.e. rust can infer in, can do with using None type

###### 137. For what using `Options<T>` type?

you have to convert an `Option<T>` to a T before you can perform T operations with it. Generally, this helps catch one of the most common issues with null: assuming that something isn’t null when it actually is.

Eliminating the risk of incorrectly assuming a not-null value helps you to be more confident in your code. In order to have a value that can possibly be null, you must explicitly opt in by making the type of that value `Option<T>`. Then, when you use that value, you are required to explicitly handle the case when the value is null. Everywhere that a value has a type that isn’t an `Option<T>`, you can safely assume that the value isn’t null. This was a deliberate design decision for Rust to limit null’s pervasiveness and increase the safety of Rust code.

So how do you get the T value out of a Some variant when you have a value of type `Option<T>` so that you can use that value? The `Option<T>` enum has a large number of methods that are useful in a variety of situations; you can check them out in [its documentation](https://doc.rust-lang.org/std/option/enum.Option.html). Becoming familiar with the methods on `Option<T>` will be extremely useful in your journey with Rust.

#### 6.2 The match Control Flow Construct


###### 138. What is `match`?

Rust has an extremely powerful control flow construct called match that allows you to compare a value against a series of patterns and then execute code based on which pattern matches

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

###### 139. How `match` works?

- First we list the match keyword followed by an expression. Expression can be evaluate to any type.
- Next are the match arms in curly brackets. 
- An arm has two parts: a pattern and some code to run, separates the => operator. 
- Each arm is separated from the next with a comma.
- When the match expression executes, it compares the resultant value against the pattern of each arm, in order
- If a pattern matches the value, the code associated with that pattern is executed. 
- If that pattern doesn’t match the value, execution continues to the next arm,
- We can have as many arms as we need
- The code associated with each arm is an expression, and the resultant value of the expression is the value that gets returned for the entire match expression.
- We don’t typically use curly brackets if the match arm code is short. 
- If you want to run multiple lines of code in a match arm, you must use curly brackets, and the comma following the arm is then optional.

```rust
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

###### 140. How to extract values out of enum variants? 

Another useful feature of match arms is that they can bind to the parts of the values that match the pattern. This is how we can extract values out of enum variants.

```rust
#[derive(Debug)] // so we can inspect the state in a minute
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {state:?}!");
            25
        }
    }
}
```
If we were to call value_in_cents(Coin::Quarter(UsState::Alaska)), coin would be Coin::Quarter(UsState::Alaska). When we compare that value with each of the match arms, none of them match until we reach Coin::Quarter(state). At that point, the binding for state will be the value UsState::Alaska. We can then use that binding in the println! expression, thus getting the inner state value out of the Coin enum variant for Quarter.

###### 141. How to extract values out of `Option<T>` enum? 

Matching with `Option<T>`

```rust
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
```

###### 142. Do we match all possibilities in match expression?

the arms patterns must cover all possibilities. If aur match code do not cover all possibilities, this is a bug and it won't compile:

```rust
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            Some(i) => Some(i + 1),
        }
    } // error[E0004]: non-exhaustive patterns: `None` not covered
```

###### 143. What are methods for match all possibilities in match expression?

- use `other` keyword in last arm pattern.

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        other => move_player(other),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}
```

- use `_` in last arm pattern

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn reroll() {}
```

###### 144. What is difference between usage `other` and `_` keyword in `match`

If we using `other` rust will pass it in code part of match arm, and we can using its value inside

If we using `_` - this suggests what we do not want using its value in code

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => (),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
```

#### 6.3 Concise Control Flow with if let and let else

###### 145. What is `if let` control flow syntax?

The syntax `if let` takes a pattern and an expression separated by an equal sign. It works the same way as a match, where the expression is given to the match and the pattern is its first arm. In this case, the pattern is Some(max), and the max binds to the value inside the Some. We can then use max in the body of the if let block in the same way we used max in the corresponding match arm. The code in the if let block only runs if the value matches the pattern.

```rust
    let config_max = Some(3u8);
    match config_max {
        Some(max) => println!("The maximum is configured to be {max}"),
        _ => (),
    }
```

it is similar

```rust
    let config_max = Some(3u8);
    if let Some(max) = config_max {
        println!("The maximum is configured to be {max}");
    }
```

we can using an `else` with an `if let`

```rust
    let mut count = 0;
    match coin {
        Coin::Quarter(state) => println!("State quarter from {state:?}!"),
        _ => count += 1,
    }
```

it is similar

```rust
    let mut count = 0;
    if let Coin::Quarter(state) = coin {
        println!("State quarter from {state:?}!");
    } else {
        count += 1;
    }
```

One common pattern is to perform some computation when a value is present and return a default value otherwise.

```rust
impl UsState {
    fn existed_in(&self, year: u16) -> bool {
        match self {
            UsState::Alabama => year >= 1819,
            UsState::Alaska => year >= 1959,
            // -- snip --
        }
    }
}

fn describe_state_quarter(coin: Coin) -> Option<String> {
    if let Coin::Quarter(state) = coin {
        if state.existed_in(1900) {
            Some(format!("{state:?} is pretty old, for America!"))
        } else {
            Some(format!("{state:?} is relatively new."))
        }
    } else {
        None
    }
}
```

That gets the job done, but it has pushed the work into the body of the if let statement, and if the work to be done is more complicated, it might be hard to follow exactly how the top-level branches relate. We could also take advantage of the fact that expressions produce a value either to produce the state from the if let or to return earl

```rust
fn describe_state_quarter(coin: Coin) -> Option<String> {
    let state = if let Coin::Quarter(state) = coin {
        state
    } else {
        return None;
    };

    if state.existed_in(1900) {
        Some(format!("{state:?} is pretty old, for America!"))
    } else {
        Some(format!("{state:?} is relatively new."))
    }
}
```

This is a bit annoying to follow in its own way, though! One branch of the if let produces a value, and the other one returns from the function entirely.

To make this common pattern nicer to express, Rust has let-else. The let-else syntax takes a pattern on the left side and an expression on the right, very similar to if let, but it does not have an if branch, only an else branch. If the pattern matches, it will bind the value from the pattern in the outer scope. If the pattern does not match, the program will flow into the else arm, which must return from the function.

```rust
fn describe_state_quarter(coin: Coin) -> Option<String> {
    let Coin::Quarter(state) = coin else {
        return None;
    };

    if state.existed_in(1900) {
        Some(format!("{state:?} is pretty old, for America!"))
    } else {
        Some(format!("{state:?} is relatively new."))
    }
}
```

### 7. Managing Growing Projects with Packages, Crates, and Modules

#### 7.1 Packages and Crates

###### 146. What is Crate?

A crate is the smallest amount of code that the Rust compiler considers at a time. Even if you run rustc rather than cargo and pass a single source code file, the compiler considers that file to be a crate. Crates can contain modules, and the modules may be defined in other files that get compiled with the crate, as we’ll see in the coming sections.

###### 147. What forms crates exists?

- binary crates
- library crates

###### 148. What is Binary crates?

Binary crates are programs you can compile to an executable that you can run, such as a command-line program or a server. Each must have a function called main that defines what happens when the executable runs.

###### 149. what is the distinctive feature Binary crates?

Binary crates must have a function called main that defines what happens when the executable runs.

###### 150. What is Library crates?

Library crates define functionality intended to be shared with multiple projects, its don’t have a main function, and they don’t compile to an executable.

###### 151. What is crate root?

The crate root is a source file that the Rust compiler starts from and makes up the root module of your crate.

###### 152. What is package?

A package is a bundle of one or more crates that provides a set of functionality. A package contains a Cargo.toml file that describes how to build those crates.

###### 153. How many crates can have package?

A package must contain at least one crate, whether that’s a library or binary crate.

###### 154. How many library crates can have package?

only one library crate

###### 155. How many binary crates can have package?

A package can contain as many binary crates as you like, but at most only one library crate. 

###### 156. What is Cargo?

Cargo is actually a package that contains the binary crate for the command-line tool you’ve been using to build your code. The Cargo package also contains a library crate that the binary crate depends on. Other projects can depend on the Cargo library crate to use the same logic the Cargo command-line tool uses.

###### 157. How create package?

`cargo new package-name`

###### 158. what structure of package directory created 'cargo new'?

Cargo.toml, src/main.rs

###### 159. How cargo understands what a package contain binary crate?

Cargo follows a convention that src/main.rs is the crate root of a binary crate with the same name as the package

###### 160. How cargo understands what a package contain library crate?

Cargo knows that if the package directory contains src/lib.rs, the package contains a library crate with the same name as the package, and src/lib.rs is its crate root

###### 161. How a package can have multiple binary crate?

A package can have multiple binary crates by placing files in the src/bin directory: each file will be a separate binary crate?

#### 7.2 Defining Modules to Control Scope and Privacy

Here, we create a binary crate named `backyard` that illustrates these rules. The crate’s directory, also named `backyard`, contains these files and directories:

```sh
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs
```

The crate root file in this case is `src/main.rs`, and it contains:

```rust
// Filename: `src/main.rs`

use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {plant:?}!");
}
```

The `pub mod garden`; line tells the compiler to include the code it finds in `src/garden.rs`, which is:

```rust
// Filename: src/garden.rs
pub mod vegetables;
```

Here, `pub mod vegetables`; means the code in `src/garden/vegetables.rs` is included too. That code is:

```rust
#[derive(Debug)]
pub struct Asparagus {}
```

###### 162. What is first a compiler does when it compiles a crate?

When compiling a crate, the compiler first looks in the crate root file (usually src/lib.rs for a library crate or src/main.rs for a binary crate) for code to compile.

###### 163. Where compiler look for module code for module declared in crate root, i.e. src/lib.rs or src/main.rs?

if we declare module, say `mod mod_name;`, the compiler  will look for the module’s code in these places:

- Inline, within curly brackets that replace the semicolon following `mod mod_name`
- In the file `src/mod_name.rs`
- In the file `src/mod_name/mod.rs`

###### 164. Where compiler look for module code for module declared in any file other than crate root, i.e. code for submodule?

if we declare sub module, say `mod sub_mod_name;` in file `src/parent_mod.rs`, the compiler  will look for the sub module’s code in these places:

- Inline, directly following mod `mod sub_mod_name`, within curly brackets instead of the semicolon
- In the file `src/parent_mod/sub_mod_name.rs`
- In the file `src/parent_mod/sub_mod_name/mod.rs`

###### 165. When and How we can refer to code in module?

- When - Module should be part of our crate
- How - if we have type `SomeType` in `src/parent_mod/sub_mod.rs` we cat refer to in as `crate::parent_mod::sub_mod::SomeType` if the privacy rules allow.

###### 166. How to do within module public?

Code within a module is private from its parent modules by default. To make a module public, declare it with pub mod instead of mod. To make items within a public module public as well, use pub before their declarations.

###### 167. For what is used `use` keyword?

Within a scope, the `use` keyword creates shortcuts to items to reduce repetition of long paths. In any scope that can refer to `crate::parent_mod::sub_mod::SomeType`, you can create a shortcut with `use crate::parent_mod::sub_mod::SomeType`; and from then on you only need to write `Asparagus` to make use of that type in the scope.

###### 168. For what is used modules?

Modules let us organize code within a crate for readability and easy reuse. Modules also allow us to control the privacy of items because code within a module is private by default.

By using modules, we can group related definitions together and name why they’re related. Programmers using this code can navigate the code based on the groups rather than having to read through all the definitions, making it easier to find the definitions relevant to them. Programmers adding new functionality to this code would know where to place the code to keep the program organized.

###### 169. For what is used private items?

Private items are internal implementation details not available for outside use. 

###### 170. For what is make modules and the items within them public.

We can choose to make modules and the items within them public, which exposes them to allow external code to use and depend on them.

###### 171. How we can create library crate?

`cargo new restaurant --lib`

###### 172. How we can structure crate?

we can organize its functions into nested modules. We define a module with the mod keyword followed by the name of the module (in this case, front_of_house). The body of the module then goes inside curly brackets. Inside modules, we can place other modules, as in this case with the modules hosting and serving. Modules can also hold definitions for other items, such as structs, enums, constants, traits, and functions.

```rust
// Filename: src/lib.rs

mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

###### 173. Why `src/main.rs` and `src/lib.rs` are called crate roots?

The reason for their name is that the contents of either of these two files form a module named crate at the root of the crate’s module structure, known as the module tree

```sh
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

###### 174. What is module tree?

module tree is crate’s module structure.
This tree shows how some of the modules nest inside other modules; for example, hosting nests inside front_of_house. The tree also shows that some modules are siblings, meaning they’re defined in the same module; hosting and serving are siblings defined within front_of_house. If module A is contained inside module B, we say that module A is the child of module B and that module B is the parent of module A. Notice that the entire module tree is rooted under the implicit module named crate.

###### 175. What does means that some modules a *siblings*?

This means that this modules are defined in the same module

###### 176. What does means that some module a child of other module?

 If module A is contained inside module B, we say that module A is the child of module B.

###### 177. What does means that some module a parent of other module?

 If module A is contained inside module B, we say that module B is the parent of module A.

#### 7.3 Paths for Referring to an Item in the Module Tree

###### 178. For what using Paths?

Paths used to show Rust where to find an item in module tree. To call a function, we need to know its path.

###### 179. What forms does Path have?

A path can take two forms:

- An absolute path is the full path starting from a crate root; for code from an external crate, the absolute path begins with the crate name, and for code from the current crate, it starts with the literal `crate`.
- A relative path starts from the current module and uses `self`, `super`, or `an` identifier in the current module.

Both absolute and relative paths are followed by one or more identifiers separated by double colons (`::`).

```rust
Filename: src/lib.rs

mod front_of_house {
    pub mod hosting { // This code will does not compile unless specified pub!
        pub fn add_to_waitlist() {}  // This code will does not compile unless specified pub!
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}
```

###### 180. What is absolute path?

An absolute path is the full path starting from a crate root; for code from an external crate, the absolute path begins with the crate name, and for code from the current crate, it starts with the literal `crate`.

Path are followed by one or more identifiers separated by double colons (`::`).

###### 181. What is relative path?

A relative path starts from the current module and uses `self`, `super`, or `an` identifier in the current module.

Path are followed by one or more identifiers separated by double colons (`::`).

###### 182. How to choose whether to use a relative or absolute path?

This is a decision you’ll make based on your project, and it depends on whether you’re more likely to move item definition code separately from or together with the code that uses the item.

For example, if we moved the front_of_house module and the eat_at_restaurant function into a module named customer_experience, we’d need to update the absolute path to add_to_waitlist, but the relative path would still be valid. However, if we moved the eat_at_restaurant function separately into a module named dining, the absolute path to the add_to_waitlist call would stay the same, but the relative path would need to be updated. 

Our preference in general is to specify absolute paths because it’s more likely we’ll want to move code definitions and item calls independently of each other.

###### 183. What a items in Rust?

functions, methods, structs, enums, modules, and constants.

###### 184. What is the default visibility of items in Rust

In Rust, all items (functions, methods, structs, enums, modules, and constants) are private to parent modules by default. Items in a parent module can’t use the private items inside child modules, but items in child modules can use the items in their ancestor modules.

###### 185. Can child items use the items it their ancestor modules?

items in child modules can use the items in their ancestor modules, but items in a parent module can’t use the private items inside child modules. This is because child modules wrap and hide their implementation details, but the child modules can see the context in which they’re defined.

###### 186. What make item private?

If you want to make an item like a function or struct private, you put it in a module.

###### 187. How  to expose inner parts of child modules’ code?

Using the `pub` keyword to make an item public.

###### 188. How to construct relative paths that begin in the parent module?

by using `super` at the start of the path

```rust
// Filename: src/lib.rs

fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }

    fn cook_order() {}
}
```

This is like starting a filesystem path with the `..` syntax. Using super allows us to reference an item that we know is in the parent module, which can make rearranging the module tree easier when the module is closely related to the parent but the parent might be moved elsewhere in the module tree someday.

###### 189. what are the default fields of a structure?

Private

###### 190. How to create an struct instance from struct whit a private fields?

This struct must provide a public associated function that construct an instance.

```rust
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }

pub fn eat_at_restaurant() {
    // Order a breakfast in the summer with Rye toast
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // Change our mind about what bread we'd like
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);

    // The next line won't compile if we uncomment it; we're not allowed
    // to see or modify the seasonal fruit that comes with the meal
    // meal.seasonal_fruit = String::from("blueberries");
}
    
```

###### 191. what are the default enum variants?

Public

###### 192. How to make enum variants public?

if we make an enum public, all of its variants are then public

```rust
mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```

#### 7.4 Bringing Paths into Scope with the use Keyword

###### 193. Why use `use` keyword?

To call a function from other module we must every time write full path to that function that can be inconvenient and repetitive.  To simplify this process we can create a shortcut to a path with the `use` keyword once, and then use the shorter name everywhere else in the scope.

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

Use only creates the shortcut for the particular scope in which the use occurs

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

mod customer {
    use crate::hosting; // re-export, if not specify - will be an error
    // use crate::front_of_house::hosting; // if not specify - will be an error
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
    }
}
```

###### 194. How do I make a name obtained with the "use" keyword available to code in another scope?

When we bring a name into scope with the use keyword, the name available in the new scope is private. To enable the code that calls our code to refer to that name as if it had been defined in that code’s scope, we can combine pub and use. This technique is called re-exporting because we’re bringing an item into scope but also making that item available for others to bring into their scope

```rust
// Filename: src/lib.rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

Before this change, external code would have to call the add_to_waitlist function by using the path restaurant::front_of_house::hosting::add_to_waitlist(), which also would have required the front_of_house module to be marked as pub. Now that this pub use has re-exported the hosting module from the root module, external code can use the path restaurant::hosting::add_to_waitlist() instead.

#### How bringing two items with the same name into scope with `use` statements?

1. we specify `use` whit path to module where name is and then required name specify with prefix module name

   ```rust
   use std::fmt;
   use std::io;

   fn function1() -> fmt::Result {
       // --snip--
   }

   fn function2() -> io::Result<()> {
       // --snip--
   }
   ```

2. after specify `use path` we can specify `as` keyword and new item name that will to use in current scope

   ```rust
   use std::fmt::Result;
   use std::io::Result as IoResult;

   fn function1() -> Result {
       // --snip--
   }

   fn function2() -> IoResult<()> {
       // --snip--
   }
   ```

###### 195. How to use External Packages?

We most specify package_name = package_version in Cargo.toml file as dependencies. This tells Cargo to download the package and any dependencies from crates.io and make it available to our project. Then we can use paths and `use` keyword to bring the crate API available to our code. If the crate is included in standard library we don't need specify it in Cargo.toml.

###### 196. How we can bring multiple items defined in the same crate or same module into scope by using one line?

We must use nested paths. We do this by specifying the common part of the path, followed by two colons, and then curly brackets around a list of the parts of the paths that differ

```rust
// Filename: src/main.rs
// --snip--
use std::cmp::Ordering;
use std::io;
// --snip--

// Filename: src/main.rs
// --snip--
use std::{cmp::Ordering, io};
// --snip--
```

###### 197. When we can use 'self' into 'use' statement?

if some paths have common part and this part is entirely one path we can merge these paths by using 'nested path' where in curly brackets common part is indicated as 'self'

```rust
// Filename: src/lib.rs
use std::io;
use std::io::Write;

// Filename: src/lib.rs

use std::io::{self, Write};
```

###### 198. How we can brings all public items defined in path into scope?

We must specify that path followed by the * glob operator.

```rust
use std::collections::*;
```

#### Separating Modules into Different Files

###### 199. How we can extract module defined in file to its own file?

First. We must create file whit name of extracted module in the same directory as file contained module or directory named as extracted module name whit file mod.rs. If we extracting sub module from module we can create file module_name/sub_module_name.rs or module_name/sub_module_name/mod.rs 
Second. Remove the module code inside the curly brackets, living only the 'mod mod_name;' declaration.
Next, place the code that was in the curly brackets into a new file named nod_name.rs, nod_name/mod.rs, module_name/sub_module_name.rs  or module_name/sub_module_name/mod.rs

was

```rust
// Filename: src/lib.rs
mod front_of_house {
    pub mod hosting {
       pub fn add_to_waitlist() {}
   }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}

became

```rust
// Filename: src/lib.rs
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}

// Filename: src/front_of_house.rs

pub mod hosting;

// Filename: src/front_of_house/hosting.rs

pub fn add_to_waitlist() {}
```

###### 200. How Rust package system allow you organize program code?

Rust lets you split a package into multiple crates and a crate into modules so you can refer to items defined in one module from another module. You can do this by specifying absolute or relative paths. These paths can be brought into scope with a use statement so you can use a shorter path for multiple uses of the item in that scope. Module code is private by default, but you can make definitions public by adding the pub keyword

### 8. Common Collections

<https://doc.rust-lang.org/std/collections/index.html>

###### 201. How unique are collections compared to other types?

Most other data types represent one specific value, but collections can contain multiple values

###### 202. What difference between collections and array and tuple?

Unlike the built-in array and tuple types, the data these collections point to is stored on the heap, which means the amount of data does not need to be known at compile time and can grow or shrink as the program runs.

###### 203. What is Vector collection?

Vector is collection that allow to store a variable number of values next to each other.

###### 204. What is String collection?

A string is a collection of characters

###### 205. What is Hash Map collection?

A hash map allows you to associate a value with a specific key. It’s a particular implementation of the more general data structure called a map

#### 8.1 Storing Lists of Values with Vectors

Note: For more on the implementation details of the `Vec<T>` type, see “[The Rustonomicon](https://doc.rust-lang.org/nomicon/vec/vec.html)”

the API [documentation](https://doc.rust-lang.org/std/vec/struct.Vec.html) for all of the many useful methods defined on `Vec<T>` by the standard library


###### 206. How create vector instance?

We can call 'Vec::new()' method and assign value to variable with annotated variable type, or call  'vec!' macro with pointing vector values and with this case we no need annotated variable type because Rust inferred it.

```rust
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3];
```

###### 207. How update a Vector?

Vector variable must be defined as mutable and then we can used 'push' method to insert value to vector

```rust
 let mut v = Vec::new();

 v.push(5);
 v.push(6);
 v.push(7);
 v.push(8);
```

The numbers we place inside are all of type i32, and Rust infers this from the data, so we don’t need the `Vec<i32>` annotation

###### 208. How we can to read Elements of Vectors?

We have two ways to reference a value stored in a vector.

- via indexing. In this case we indicate a vector variable with followed square brackets with value index inside. Index numbering starts from zero.
- by means `get` method. In this case as argument we pass to `get` method vector value index also. This method return `Option<&T>` type.

###### 209. What is difference between reference vector value by index and by means `get` method?

In case reference by index we get a value or value reference and if we specify not existing index this will cause the program to panic.
In case of reference by method `get` we get `Option<&T>` type and if we pass not-existing index we get `None` variant of `Option<&T>`

```rust
    let v = vec![1, 2, 3, 4, 5];

    let third: &i32 = &v[2];
    println!("The third element is {third}");

    let third: Option<&i32> = v.get(2);
    match third {
        Some(third) => println!("The third element is {third}"),
        None => println!("There is no third element."),
    }
```

###### 210. In what cases did we used a reference to vector value by index?

This method is best used when you want your program to crash if there’s an attempt to access an element past the end of the vector.

```rust
    let v = vec![1, 2, 3, 4, 5];

    let does_not_exist = &v[100];
    let does_not_exist = v.get(100);
```

###### 211. In what cases did we used a reference to vector value by means `get` method?

You would use this method if accessing an element beyond the range of the vector may happen occasionally under normal circumstances. Your code will then have logic to handle having either `Some(&element)` or `None`

###### 212. Can we have immutable and mutable reference to vector value?

We can not have immutable and mutable reference to vector value in the same scope

```rust
    // not compile
    let mut v = vec![1, 2, 3, 4, 5];

    let first = &v[0]; // immutable borrow occurs here

    v.push(6); // mutable borrow occurs here

    println!("The first element is: {first}"); // immutable borrow later used here
```

###### 213. How we can Iterating Over the immutable Values in a Vector?

We must use `for` loop with immutable reference to vector variable

```rust
    let v = vec![100, 32, 57];
    for i in &v {
        println!("{i}");
    }
```

###### 214. How we can Iterating Over the mutable Values in a Vector?

We must use `for` loop with mutable reference to vector variable and use the * dereference operator to get to the value in i before we can use the += operator

```rust
    let v = vec![100, 32, 57];
    for i in &mut v {
        *i += 50;
    }
```

###### 215. Can we modify the entire vector while iterating over the vector?

Iterating over a vector, whether immutably or mutably, is safe because of the borrow checker’s rules. If we attempted to insert or remove items in the for loop bodies we would get a compiler error. The reference to the vector that the for loop holds prevents simultaneous modification of the whole vector.


###### 216. Can we store in vector values different types?

Vectors can only store values that are of the same type

###### 217. How we can store in vector values different types?

We can define an enum whose variants will hold the different value types, and all the enum variants will be considered the same type: that of the enum. Then we can create a vector to hold that enum and so, ultimately, hold different types

```rust
    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("blue")),
        SpreadsheetCell::Float(10.12),
    ];
```

###### 218. In case of using a vector with enum values holds different types, how can we handle these values?

Using a `match` expression whit the exhaustive set of types.

###### 219. Where vector API?

the API [documentation](https://doc.rust-lang.org/std/vec/struct.Vec.html) for all of the many useful methods defined on `Vec<T>` by the standard library

#### 8.2 Storing UTF-8 Encoded Text with Strings

###### 220. What Is a String?

Rust has only one string type in the core language, which is the string slice str that is usually seen in its borrowed form &str. String literals, for example, are stored in the program’s binary and are therefore string slices.

The String type, which is provided by Rust’s standard library rather than coded into the core language, is a growable, mutable, owned, UTF-8 encoded string type. When Rustaceans refer to “strings” in Rust, they might be referring to either the String or the string slice &str types, not just one of those types.

###### 221. How implemented String type?

String is implemented as a wrapper around a vector of bytes with some extra guarantees, restrictions, and capabilities

###### 222. How create new String?

- By using function `new`

```rust
let mut s = String::new();
```

- using the `to_string` method, which is available on any type that implements the Display trait

```rust
    let data = "initial contents";

    let s = data.to_string();

    // the method also works on a literal directly:
    let s = "initial contents".to_string();
```

- using `String::from` function to create a String from a string literal

```rust
    let s = String::from("initial contents");
```

###### 223. How update a String?

- by using the `push_str` method to append a string slice `&str`

```rust
    let mut s1 = String::from("foo");
    let s2 = "bar";
    s1.push_str(s2);
    println!("s2 is {s2}");
```

- Using `push` method that takes a single character as a parameter and adds it to the String

```rust
    let mut s = String::from("lo");
    s.push('l');
```

- using String Concatenation with the + Operator

```rust
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used
    // fn add(self, s: &str) -> String {
```

- using the `format!` macro:

```rust
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");

    let s = format!("{s1}-{s2}-{s3}");
```

###### 224. What happen when we perform String Concatenation with the + Operator?

the `+` Operator uses the `add` method by accepting first operand as first parameter, taking it ownership and second operand as second parameter as string slice (&str). When we instead &str passes into `add` function String reference (&String) Rust uses a `deref coercion`, which turns &String into &String[..] (&str). Next `add` takes ownership of first parameter, appends a copy of the contents of second parameters, and then returns ownership of the result. Because add does not take ownership of the second parameter, second parameter variable will still be a valid String after this operation unlike first parameter.

```rust
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used
    // fn add(self, s: &str) -> String {
```

###### 225. How `format!` macro works?

The `format!` macro works like println!, but instead of printing the output to the screen, it returns a String with the contents. The code generated by the format! macro uses references so that this its call doesn’t take ownership of any of its parameters.

```rust
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");

    let s = format!("{s1}-{s2}-{s3}");
```

###### 226. What is string `deref coercion`?

Many String methods accept as parameters string slice type (&str). When we pass it a &String type argument, Rust performs a type coercion - &String to &String[..] (&str), which is called `deref coercion`

###### 227. Can we access parts of a String using indexing syntax?

If we try to index a String, we well get an error.

###### 228. Why doesn't Rust allow you to index a string?

A string is a collection of chars. Rust uses UTF-8 to encode chars, and so each char can take up between one and four bytes. In Rust, a string is implemented as a byte vector, which is a collection of bytes, and when we index a String, we are referencing a single byte, which doesn't make sense in the context of a String.

###### 229. Can we slicing a String?

We can slicing a String, but it is bad practice. Each char of String can take range up between one and four bytes, when we do slice we get reference to individual bytes, not whole characters and if we do not capture the entire byte range of the char, we will get a panic at runtime and program crash.

```rust
// this will crash

let hello = "Здравствуйте";

let s = &hello[0..1]; // byte index 1 is not a char boundary; it is inside 'З' (bytes 0..2) of `Здравствуйте`
```

###### 230. How we can iterate over String by Char?

We must used `chars()` method

```rust
for c in "Зд".chars() {
    println!("{c}");
}
```

This code will print the following:

```text
З
д
```

###### 231. How we can iterate over String by Bytes?

We must used `bytes()` method

```rust
for b in "Зд".bytes() {
    println!("{b}");
}
```

This code will print the four bytes that make up this string:

```text
208
151
208
180
```

#### 8.3 Storing Keys with Associated Values in Hash Maps

###### 232. What is Hash Maps?

The type HashMap<K, V> stores a mapping of keys of type K to values of type V using a hashing function, which determines how it places these keys and values into memory. 

###### 233. What are Hash Maps used for?

Hash maps are useful when you want to look up data not by using an index, as you can with vectors, but by using a key that can be of any type.

###### 234. How to create hash maps?

One way to create an empty hash `map` is to use new and to add elements with `insert`

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
```

###### 235. How to access a value in Hash Map?

We can get a value out of the hash map by providing its key to the `get` method

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = scores.get(&team_name).copied().unwrap_or(0);
```

The `get` method returns an `Option<&V>`; if there’s no value for that key in the hash map, `get` will return None. This program handles the Option by calling copied to get an `Option<i32>` rather than an `Option<&i32>`, then unwrap_or to set score to zero if scores doesn’t have an entry for the key

###### 236. What type does the `get` method of Hash Map return?

Option<&V>

###### 237. How we can iterate over each key–value pair in a hash map?

Using the `for` loop

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    for (key, value) in &scores {
        println!("{key}: {value}");
    }
```

This code will print each pair in an arbitrary order:

```text
Yellow: 50
Blue: 10
```

###### 238. How Hash Map to process Ownership?

For types that implement the Copy trait, like i32, the values are copied into the hash map. For owned values like String, the values will be moved and the hash map will be the owner of those values

```rust
    use std::collections::HashMap;

    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");

    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // field_name and field_value are invalid at this point, try using them and
    // see what compiler error you get!
```

We aren’t able to use the variables field_name and field_value after they’ve been moved into the hash map with the call to insert.

If we insert references to values into the hash map, the values won’t be moved into the hash map. The values that the references point to must be valid for at least as long as the hash map is valid

###### 239. What happens if you insert a value into a hash map for an existing key?

Old value will be overwritten

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Blue"), 25);

    println!("{scores:?}"); //{"Blue": 25}
```

###### 240. How insert a Key and Value Only If a Key Isn’t Present?

Hash maps have a special API for this called `entry` that takes the key you want to check as a parameter. The return value of the entry method is an enum called `Entry` that represents a value that might or might not exist. The `or_insert` method on `Entry` is defined to return a mutable reference to the value for the corresponding `Entry` key if that key exists, and if not, it inserts the parameter as the new value for this key and returns a mutable reference to the new value.

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);

    scores.entry(String::from("Yellow")).or_insert(50);
    scores.entry(String::from("Blue")).or_insert(50);

    println!("{scores:?}"); // {"Yellow": 50, "Blue": 10}
```

###### 241. How to Update a Value Based on the Old Value?

```rust
    use std::collections::HashMap;

    let text = "hello world wonderful world";

    let mut map = HashMap::new();

    for word in text.split_whitespace() { // The split_whitespace method returns an iterator over subslices, separated by whitespace, of the value in text
        let count = map.entry(word).or_insert(0); //The or_insert method returns a mutable reference (&mut V) to the value for the specified key
        *count += 1; //we store that mutable reference in the count variable, so in order to assign to that value, we must first dereference count using the asterisk (*)
        // The mutable reference goes out of scope at the end of the for loop, so all of these changes are safe and allowed by the borrowing rules.
    }

    println!("{map:?}"); // {"world": 2, "hello": 1, "wonderful": 1}
```

###### 242. In what order does iteration occur in a hash map?

iterating over a hash map happens in an arbitrary order.

###### 243. What hashing function used in Hash Map?

SipHash <https://en.wikipedia.org/wiki/SipHash>

### 9. Error Handling

###### 244. What error categories exist in Rust?

Rust groups errors into two major categories: recoverable and unrecoverable errors. For a recoverable error, such as a file not found error, we most likely just want to report the problem to the user and retry the operation. Unrecoverable errors are always symptoms of bugs, such as trying to access a location beyond the end of an array, and so we want to immediately stop the program.

#### 9.1 Unrecoverable Errors with panic!

###### 245. What is unrecoverable errors?

Unrecoverable errors are always symptoms of bugs, such as trying to access a location beyond the end of an array, and so we want to immediately stop the program.

###### 246. What are alternative actions of Rust in case of panic?

- unwinding. Rust walks back up the stack and cleans up the data from each function it encounters. The default action.
- aborting, which ends the program without cleaning up. Memory that the program was using will then need to be cleaned up by the operating system

###### 247. How and why switch from unwinding to aborting?

If in your project you need to make the resultant binary as small as possible, you can switch from unwinding to aborting upon a panic by adding panic = 'abort' to the appropriate `[profile]` sections in your Cargo.toml file

```toml
[profile.release]
panic = 'abort'
```

###### 248. What ways to cause a panic in practice?

- by taking an action that causes our code to panic (such as accessing an array past the end) 

```rust
fn main() {
    let v = vec![1, 2, 3];

    v[99];
}
```

- by explicitly calling the panic! macro. In both cases, we cause a panic in our program. By default, these panics will print a failure message, unwind, clean up the stack, and quit

```rust
fn main() {
    panic!("crash and burn");
}
```

###### 249. What actions does Rust take when panic occurs?

panics will print a failure message, unwind, clean up the stack, and quit

###### 250. what is backtrace?

A backtrace is a list of all the functions that have been called to get to this point

###### 251. How to read a backtrace?

To start from the top and read until you see files you wrote. That’s the spot where the problem originated. The lines above that spot are code that your code has called; the lines below are code that called your code. These before-and-after lines might include core Rust code, standard library code, or crates that you’re using

###### 252. what settings are needed to print the backtrace?

 debug symbols must be enabled. Debug symbols are enabled by default when using `cargo build` or `cargo run` without the --release flag

#### 9.2 Recoverable Errors with Result

###### 253. What is recoverable error?

For a recoverable error we most likely just want to report the problem to the user and retry the operation, for example file not found error.

###### 254. How does Rust program handle recoverable error?

Functions or methods that may encounter a recoverable error must return enum Result type. The calling code must handle the various enum Result type `Ok` or `Err` variants.

###### 255. What is enum Result type?

enum Result type is type that returned from function than can generated recoverable error. Enum Result type has two variants `Ok` and `Err` which are bound to  generic type parameters `T` and `E`. `T` represents the type of the value that will be returned in a success case within the Ok variant, and E represents the type of the error that will be returned in a failure case within the Err variant. Because Result has these generic type parameters, we can use the Result type and the functions defined on it in many different situations where the success value and error value we want to return may differ.

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

###### 256. How recoverable error handled using Result type?

Function return Result type value. This value is checked using a match expression, depending on whether `Ok` or `Err` matches, the corresponded arm selected. Usually, in case `Ok`  bound value returned, in case `Err` error handled.

```rust
Filename: src/main.rs
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {e:?}"),
            },
            other_error => {
                panic!("Problem opening the file: {other_error:?}");
            }
        },
    };
}
```

another way to write the same logic, this time using closures and the unwrap_or_else method:

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {error:?}");
            })
        } else {
            panic!("Problem opening the file: {error:?}");
        }
    });
}
```

###### 257. What is the result of the `unwrap()` method?

If the Result value is the Ok variant, unwrap will return the value inside the Ok. If the Result is the Err variant, unwrap will call the panic! macro for us. Here is an example of unwrap in action:

```rust
// Filename: src/main.rs

use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap();
}

// thread 'main' panicked at src/main.rs:4:49:
// called `Result::unwrap()` on an `Err` value: Os { code: 2, kind: NotFound, message: "No such file or directory" }

```

###### 258. What is the result of the `expect()` method?

If the Result value is the Ok variant, `expect()` will return the value inside the Ok. If the Result is the Err variant, `expect()` will call the panic! macro. Error message used by expect in its call to panic! will be the parameter that we pass to expect, rather than the default panic! message that unwrap uses

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt")
        .expect("hello.txt should be included in this project");
}


// thread 'main' panicked at src/main.rs:5:10:
// hello.txt should be included in this project: Os { code: 2, kind: NotFound, message: "No such file or directory" }
```

###### 259. What is Propagating Errors?

If we get a variant of the `Err` Result inside our function, we can pass it on to the calling code to handle. This called Propagating Errors.

###### 260. How we can Propagate Error?

We must annotate the return type as `Result<T, E>` whit appropriate success and error types and wraps return result of the function execution in appropriate of the variant Result enum 

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```

###### 261. What does the `?` operator?

We must used `?` operator in function that Propagate Error, i.e. it receive and return Result type. The ? placed after a received Result type value - if the value of the Result is an Ok, the value inside the Ok will get returned from this expression, and the program will continue. If the value is an Err, the Err will be returned from the whole function as if we had used the return keyword so the error value gets propagated to the calling code.

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```

the same

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();

    File::open("hello.txt")?.read_to_string(&mut username)?;

    Ok(username)
}
```

The `?` operator can be used with `Option<T>` values as well. As with using `?` on Result, you can only use `?` on Option in a function that returns an Option. The behavior of the ? operator when called on an `Option<T>` is similar to its behavior when called on a `Result<T, E>`: if the value is None, the None will be returned early from the function at that point. If the value is Some, the value inside the Some is the resultant value of the expression, and the function continues.

```rust
// a function that finds the last character of the first line in the given text.
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last()
}
```

This function returns Option<char> because it’s possible that there is a character there, but it’s also possible that there isn’t. This code takes the text string slice argument and calls the lines method on it, which returns an iterator over the lines in the string. Because this function wants to examine the first line, it calls next on the iterator to get the first value from the iterator. If text is the empty string, this call to next will return None, in which case we use ? to stop and return None from last_char_of_first_line. If text is not the empty string, next will return a Some value containing a string slice of the first line in text.

The ? extracts the string slice, and we can call chars on that string slice to get an iterator of its characters. We’re interested in the last character in this first line, so we call last to return the last item in the iterator. This is an Option because it’s possible that the first line is the empty string; for example, if text starts with a blank line but has characters on other lines, as in "\nhi". However, if there is a last character on the first line, it will be returned in the Some variant. The ? operator in the middle gives us a concise way to express this logic, allowing us to implement the function in one line. If we couldn’t use the ? operator on Option, we’d have to implement this logic using more method calls or a match expression.

###### 262. What happen when `Err` Result value have called `?` operator?

`Err` Result value go through the `from` function, defined in the From trait in the standard library, which is used to convert values from one type into another. When the ? operator calls the `from` function, the error type received is converted into the error type defined in the return type of the current function. This is useful when a function returns one error type to represent all the ways a function might fail, even if parts might fail for many different reasons.

###### 263. What does the `fs::read_to_string` function?

Reading a file into a string is a fairly common operation, so the standard library provides the convenient `fs::read_to_string` function that opens the file, creates a new String, reads the contents of the file, puts the contents into that String, and returns it in `Ok` Result or `Err` in case error.

```rust
use std::fs;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```

###### 264. Can `?` operator automatically convert a Result to an Option or vice versa?

The ? operator won’t automatically convert a Result to an Option or vice versa; in those cases, you can use methods like the `ok` method on Result or the `ok_or` method on Option to do the conversion explicitly.

###### 265. What type can the main function return?

The main function may return any types that implement the `std::process::Termination` trait, which contains a function `report` that returns an `ExitCode`.

main can also return a Result<(), E>, but we’ve changed the return type of main to be `Result<(), Box<dyn Error>>` and added a return value `Ok(())` to the end. This code will now compile.

```rust
// Filename: src/main.rs

use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?;

    Ok(())
}
```

The `Box<dyn Error>` type is a trait object, you can read `Box<dyn Error>` to mean “any kind of error.” Using ? on a Result value in a main function with the error type `Box<dyn Error>` is allowed because it allows any Err value to be returned early. Even though the body of this main function will only ever return errors of type std::io::Error, by specifying `Box<dyn Error>`, this signature will continue to be correct even if more code that returns other errors is added to the body of main.

When a main function returns a Result<(), E>, the executable will exit with a value of 0 if main returns Ok(()) and will exit with a nonzero value if main returns an Err value. Executables written in C return integers when they exit: programs that exit successfully return the integer 0, and programs that error return some integer other than 0. Rust also returns integers from executables to be compatible with this convention

#### 9.3 To panic! or Not to panic!

###### 266. when call panic! and when return Result?

When code panics, there’s no way to recover. You could call panic! for any error situation, whether there’s a possible way to recover or not, but then you’re making the decision that a situation is unrecoverable on behalf of the calling code. When you choose to return a Result value, you give the calling code options. The calling code could choose to attempt to recover in a way that’s appropriate for its situation, or it could decide that an Err value in this case is unrecoverable, so it can call panic! and turn your recoverable error into an unrecoverable one. Therefore, returning Result is a good default choice when you’re defining a function that might fail.

### 10 Generic Types, Traits, and Lifetimes

###### 267. What are generics for?

For effectively handling code duplication. Functions can take parameters of some generic type, instead of a concrete type like i32 or String, in the same way they take parameters with unknown values to run the same code on multiple concrete values.

###### 268. How to extract duplicate code?

1. Identify duplicate code.
2. Extract the duplicate code into the body of the function, and specify the inputs and return values of that code in the function signature.
3. Update the duplicate code locations to call the function instead.

#### 10.1 Generic Data Types

###### 269. How to name type parameters?

To parameterize the types in a function, struct, enum we need to name the type parameters. We can use any identifier as a type parameter name following Rust’s type-naming convention that is UpperCamelCase. But, by convention, type parameter names in Rust are short, often just one letter.


###### 270. How define function that uses generics?

To define a generic function, we place type name declarations inside angle brackets, <>, between the name of the function and the parameter list and declare this parameter names in the signature as parameter type annotation and return type annotation. Then we can use type names in function body.
We read generic function definition as: the function some_function name is generic over some types T S ...

```rust
fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {result}");

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {result}");
}
```

###### 271. What is parameter type Restriction?

In some situations where some operations are performed on generic type parameters, we must restrict generic types to only types that support those operations. This is done by annotating the generic type name definition in angle brackets with Traits that define those operations.

`fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T `


###### 272. How define struct that uses generics?

To define a generic struct, we place type name declarations inside angle brackets, <>, between the name of the struct and struct body. Then we can use type names in struct body as struct field type annotations.
We read generic struct definition as: the struct some_struct name is generic over some types T S ...

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

###### 273. How define enum that uses generics?

To define a generic enum, we place type name declarations inside angle brackets, <>, between the name of the enum and enum body. Then we can use type names in enum body as enum variants bound value type annotations.
We read generic enum definition as: the enum some_enum name is generic over some types T S ...

```rust
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

###### 274. How define method that uses generics?

To define a generic method of a struct or enum, we put the type name declarations in angle brackets, <>, between the `impl` keyword and the struct or enum name, also with the type names in angle brackets. We can then define the generic method itself. When defining a particular method, we can use different type names than those used when defining the struct or enum.

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

```rust
struct Point<X1, Y1> {
    x: X1,
    y: Y1,
}

impl<X1, Y1> Point<X1, Y1> {
    fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X1, Y2> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 };
    let p2 = Point { x: "Hello", y: 'c' };

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}
```

###### 275. How we can specify constraints on generic types when defining methods on the type?

We can also specify constraints on generic types when defining methods on the type. We could, for example, implement methods only on `Point<f32>` instances rather than on `Point<T>` instances with any generic type.

```rust
// Filename: src/main.rs

impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

This code means the type Point<f32> will have a distance_from_origin method; other instances of Point<T> where T is not of type f32 will not have this method defined. The method measures how far our point is from the point at coordinates (0.0, 0.0) and uses mathematical operations that are available only for floating-point types

###### 276. What is Monomorphization?

This process that Rust compiler performs at compiler time.
the process of turning generic code into specific code by filling in the concrete types that are used when compiled. The compiler looks at all the places where generic code is called and generates code for the concrete types that the generic code is called with.

```rust
// generic code
let integer = Some(5);
let float = Some(5.0);

// run time code, past Monomorphization?

enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}
```

#### 10.2 Traits: Defining Shared Behavior

###### 277. What is Trait for?

A trait defines the functionality a particular type has and can share with other types. We can use traits to define shared behavior in an abstract way. We can use trait bounds to specify that a generic type can be any type that has certain behavior.

###### 278. What determines the behavior of a type?

The behavior of a type is defined by the set of methods we can call on that type.

###### 279. When types shares the same behavior?

 Different types share the same behavior if we can call the same methods on all of those types.

###### 280. Hwo in Rust define a shared behavior?

Trait definitions are a way to group method signatures together to define a set of behaviors necessary to accomplish some purpose.

###### 281. How define Trait?

We declare a trait using the trait keyword and then the trait’s name. We also must declare a trait as pub so that crates depending on this crate can make use of this trait too. Inside the curly brackets, we declare the method signatures that describe the behaviors of the types that implement this trait. After the method signature, instead of providing an implementation within curly brackets, we use a semicolon. 

```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String;
}
```

###### 282. How a type implements a trait?

Each type implementing a trait must provide its own custom behavior for the body of a trait methods. The compiler will enforce that any type that has a trait will have methods defined its  signatures exactly.

After `impl`, we put the trait name we want to implement, then use the `for` keyword, and then specify the name of the type we want to implement the trait for. Within the impl block, we put the method signatures that the trait definition has defined. Instead of adding a semicolon after each signature, we use curly brackets and fill in the method body with the specific behavior that we want the methods of the trait to have for the particular type.

```rust
// Filename: src/lib.rs

pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

###### 283. How should we use a types that implement a trait?

When a type implement a trait we can call trait method on an instance of the type in the same way we call regular methods. The only difference is that the user must bring the trait into scope as well as the types

```rust
use aggregator::{Summary, Tweet};

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());
}
```

###### 284. Can we implement external traits on external types?

we can’t implement external traits on external types. For example, we can’t implement the Display trait on Vec<T> within our aggregator crate because Display and Vec<T> are both defined in the standard library and aren’t local to our aggregator crate.

we can implement a trait on a type only if either the trait or the type, or both, are local to our crate.

###### 285. Can a trait contain an implementation of the method it defines?

A trait can contain method whit implementation. This is called "Default Implementations"

```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

###### 286. What happen if a type implement trait whit default implemented methods

We can call a methods of the trait on type instance. In case the type make own implementations this methods (this called 'overriding') - will be called this methods, otherwise will be called default implemented  methods  of the trait.

```rust
impl Summary for NewsArticle {} //will be called trait methods

let article = NewsArticle {
    headline: String::from("Penguins win the Stanley Cup Championship!"),
    location: String::from("Pittsburgh, PA, USA"),
    author: String::from("Iceburgh"),
    content: String::from(
        "The Pittsburgh Penguins once again are the best \
            hockey team in the NHL.",
    ),
};

println!("New article available! {}", article.summarize());
```

###### 287. Can default implemented trait methods call other methods of the trait?

Default implementations can call other methods in the same trait, even if those other methods don’t have a default implementation. In this way, a trait can provide a lot of useful functionality and only require implementors to specify a small part of it.

```rust
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

// To use this version of Summary, we only need to define summarize_author when we implement the trait on a type:

impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}

let tweet = Tweet {
    username: String::from("horse_ebooks"),
    content: String::from(
        "of course, as you probably already know, people",
    ),
    reply: false,
    retweet: false,
};

println!("1 new tweet: {}", tweet.summarize());
```

###### 288. How to call the default implementation from an overriding implementation of that same method?

it isn’t possible

###### 289. How type of argument can accept function parameter annotated by trait type? 

This parameter can accepts any type that implements that trait.

###### 290. What syntaxes used to define functions that accept many types?

- `impl Trait_name` syntax
- Trait Bound Syntax

###### 291. How to use `impl trait_name` syntax to define functions that accept many different types?

in function signature, instead of a concrete type for the parameter, we specify the `impl` keyword and the trait name.

```rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

we can use multiple traits in parentheses past `impl` keyword whit `+` syntax between traits

```rust
pub fn notify(item: &(impl Summary + Display)) {
```


###### 292. How to use Trait Bound Syntax to define functions that accept many different types?

in definition of generic function, with the declaration of the generic type parameter inside angle brackets we place trait bounds after a parameter name followed by colon.

```rust
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

```rust
pub fn notify(item1: &impl Summary, item2: &impl Summary) {
pub fn notify<T: Summary>(item1: &T, item2: &T) {
```

we can use multiple traits past colon whit `+` between traits

```rust
pub fn notify<T: Summary + Display>(item: &T) {
```

we can use Trait Bounds with where Clauses

```rust
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {
```

we can use a `where` clause - past function signature, between return type and function body we indicate `where` clause followed by list of  generic name whit colon and list of trait via `+`:

```rust
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
```

###### 293. How to use Trait in defining a function's return type?

We can use `impl Trait` syntax. We specify in definition of function return type keyword `impl` followed Trait name.

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
```

However, you can only use impl Trait if you’re returning a single type. For example, this code that returns either a NewsArticle or a Tweet with the return type specified as impl Summary wouldn’t work:

This code does not compile!

```rust
fn returns_summarizable(switch: bool) -> impl Summary {
    if switch {
        NewsArticle {
            headline: String::from(
                "Penguins win the Stanley Cup Championship!",
            ),
            location: String::from("Pittsburgh, PA, USA"),
            author: String::from("Iceburgh"),
            content: String::from(
                "The Pittsburgh Penguins once again are the best \
                 hockey team in the NHL.",
            ),
        }
    } else {
        Tweet {
            username: String::from("horse_ebooks"),
            content: String::from(
                "of course, as you probably already know, people",
            ),
            reply: false,
            retweet: false,
        }
    }
}
```

Returning either a NewsArticle or a Tweet isn’t allowed due to restrictions around how the impl Trait syntax is implemented in the compiler. We’ll cover how to write a function with this behavior in the “Using Trait Objects That Allow for Values of Different Types” section of Chapter 18.

###### 294. What can we Conditionally Implement Methods by Using Trait Bounds?

If we have generic Struct on Enum, by defining a method we can specify in angel bracket of `impl` definition parts Trait Bounds, that is name of parameter type followed colon and list of Traits connected `+`.

```rust
Filename: src/lib.rs
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```

###### 295. What is blanket implementations?

We can also conditionally implement a trait for any type that implements another trait. Implementations of a trait on any type that satisfies the trait bounds are called blanket implementations and are used extensively in the Rust standard library. For example, the standard library implements the ToString trait on any type that implements the Display trait. The impl block in the standard library looks similar to this code:

```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

#### 10.3 Validating References with Lifetimes

###### 296. What is lifetime?

- as generic. Lifetime is kind of generic that ensure that references are valid as long as we need them to be.

- as property of reference. Every reference in Rust has a lifetime. Reference lifetime is program scope for which the reference is valid.

###### 297. What is mean - reference is valid?

This means that the value referenced by this reference will not be dropped from memory due to going out of scope of the owner that value.

###### 298. When we must annotate a Lifetime?

Most of the time, lifetimes are implicit and inferred, just like most of the time, types are inferred. We  must annotate lifetimes when the lifetimes of references could be related in a few different ways. Rust requires us to annotate the relationships using generic lifetime parameters to ensure the actual references used at runtime will definitely be valid.

###### 299. What main aim of lifetimes?

The main aim of lifetimes is to prevent dangling references, which cause a program to reference data other than the data it’s intended to reference

###### 300. What does Borrow Checker do?

The Rust compiler has a borrow checker that compares scopes to determine whether all borrows are valid.
At compile time, Rust compares the size of the two lifetimes and sees that r has a lifetime of 'a but that it refers to memory with a lifetime of 'b. The program is rejected because 'b is shorter than 'a: the subject of the reference doesn’t live as long as the reference.

```rust
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {r}");   //          |
}                         // ---------+
```

Here, x has the lifetime 'b, which in this case is larger than 'a. This means r can reference x because Rust knows that the reference in r will always be valid while x is valid.

```rust
fn main() {
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {r}");   //   |       |
                          // --+       |
}                         // ----------+
```

###### 301. What is mean when function return borrowed value (reference)?

This means that this borrowing comes from one of the function parameters.

###### 302. When we must annotate return value of function by lifetime parameter?

If we define function that accept some borrows and return borrow and we do not definitely determine from what parameter  borrowed return value we must specify to compiler how determine lifetime of return borrow. This hint to the compiler is made using the lifetime parameter.

###### 303. Can have  parameters of function different reference lifetime? 

functions can accept references with any lifetime by specifying a generic lifetime parameter.

###### 304. What describe Lifetime annotations?

They describe the relationships of the lifetimes of multiple references to each other without affecting the lifetimes.

annotations are meant to tell Rust how generic lifetime parameters of multiple references relate to each other

###### 305. What syntax have Lifetime annotation?

the names of lifetime parameters must start with an apostrophe (') and are usually all lowercase and very short, like generic types. Most people use the name 'a for the first lifetime annotation. We place lifetime parameter annotations after the & of a reference, using a space to separate the annotation from the reference’s type.

```rust
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

###### 306. How to use lifetime annotations in function signatures?

To use lifetime annotations in function signatures, we need to declare the generic lifetime parameters inside angle brackets between the function name and the parameter list,

We want the signature to express the following constraint: the returned reference will be valid as long as both the parameters are valid. This is the relationship between lifetimes of the parameters and the return value.

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

The function signature now tells Rust that for some lifetime 'a, the function takes two parameters, both of which are string slices that live at least as long as lifetime 'a. The function signature also tells Rust that the string slice returned from the function will live at least as long as lifetime 'a. In practice, it means that the lifetime of the reference returned by the longest function is the same as the smaller of the lifetimes of the values referred to by the function arguments. These relationships are what we want Rust to use when analyzing this code.

###### 307. What means  If the reference returned from function does not refer to one of the parameters?

Returned reference would be a dangling reference because the value will go out of scope at the end of the function.

###### 308. How we can define struct whit field contained reference?

We can define structs to hold references, but in that case we would need to add a lifetime annotation on every reference in the struct’s definition.

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```

we declare the name of the generic lifetime parameter inside angle brackets after the name of the struct so we can use the lifetime parameter in the body of the struct definition. This annotation means an instance of ImportantExcerpt can’t outlive the reference it holds in its part field.

###### 309. Can we specify lifetime parameters for every functions or structs that use references?

 In early versions (pre-1.0) of Rust every reference needed an explicit lifetime. In this time some pattern lifetime annotations programmed into the compiler’s code so the borrow checker could infer the lifetimes in these situations and wouldn’t need explicit annotations.

###### 310. What is lifetime elision rules?

Patterns programmed into Rust’s analysis of references for recognition lifetime annotations patterns.

###### 311. What is Input lLifetimes?

Lifetimes on function or method parameters are called input lifetimes

###### 312. What is Output Lifetimes?

 lifetimes on return values are called output lifetimes

###### 313. How compiler analysis of references in context of recognition lifetime annotations patterns?

The compiler uses three rules to figure out the lifetimes of the references when there aren’t explicit annotations. The first rule applies to input lifetimes, and the second and third rules apply to output lifetimes. If the compiler gets to the end of the three rules and there are still references for which it can’t figure out lifetimes, the compiler will stop with an error. These rules apply to `fn` definitions as well as `impl` blocks.

The first rule is that the compiler assigns a lifetime parameter to each parameter that’s a reference. In other words, a function with one parameter gets one lifetime parameter: `fn foo<'a>(x: &'a i32);` a function with two parameters gets two separate lifetime parameters: `fn foo<'a, 'b>(x: &'a i32, y: &'b i32);` and so on.

The second rule is that, if there is exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters: `fn foo<'a>(x: &'a i32) -> &'a i32`.

The third rule is that, if there are multiple input lifetime parameters, but one of them is `&self` or `&mut self` because this is a method, the lifetime of self is assigned to all output lifetime parameters. This third rule makes methods much nicer to read and write because fewer symbols are necessary.

###### 314. What annotate lifetime in Method Definitions?

Lifetime names for struct fields always need to be declared after the impl keyword and then used after the struct’s name because those lifetimes are part of the struct’s type.

In method signatures inside the impl block, references might be tied to the lifetime of references in the struct’s fields, or they might be independent. In addition, the lifetime elision rules often make it so that lifetime annotations aren’t necessary in method signatures.

```rust
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

The lifetime parameter declaration after impl and its use after the type name are required, but we’re not required to annotate the lifetime of the reference to self because of the first elision rule.

Here is an example where the third lifetime elision rule applies:

```rust
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {announcement}");
        self.part
    }
}
```

There are two input lifetimes, so Rust applies the first lifetime elision rule and gives both &self and announcement their own lifetimes. Then, because one of the parameters is &self, the return type gets the lifetime of &self, and all lifetimes have been accounted for.

###### 315. What is Static Lifetime?

'static Lifetime denotes that the affected reference can live for the entire duration of the program

###### 316. What Lifetime have string literal?

All string literals have the 'static lifetime, which we can annotate as follows:

```rust
let s: &'static str = "I have a static lifetime.";
```

The text of this string is stored directly in the program’s binary, which is always available. Therefore, the lifetime of all string literals is 'static.

###### 317. How used Generic Type Parameters, Trait Bounds, and Lifetimes Together?

```rust
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {ann}");
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

This is the longest function from Listing 10-21 that returns the longer of two string slices. But now it has an extra parameter named ann of the generic type T, which can be filled in by any type that implements the Display trait as specified by the where clause. This extra parameter will be printed using {}, which is why the Display trait bound is necessary. Because lifetimes are a type of generic, the declarations of the lifetime parameter 'a and the generic type parameter T go in the same list inside the angle brackets after the function name.

### 11 Writing Automated Tests

#### 11.1 How to Write Tests

###### 318. What is tests?

Tests are Rust functions that verify that the non-test code is functioning in the expected manner.

###### 319. What perform body of test function?

The bodies of test functions typically perform these three actions:

- Set up any needed data or state.
- Run the code you want to test.
- Assert that the results are what you expect.

###### 320. What is Attribute

 Attributes are metadata about pieces of Rust code

###### 321. How from function make test function?

To change a function into a test function, add `#[test]` attribute annotation on the line before `fn`

###### 322. How we run tests?

we run tests by the `cargo test` command

###### 323. What happen when we run tests with the cargo test command?

Rust builds a test runner binary that runs the annotated functions and reports on whether each test function passes or fails.

###### 324. What happen in testing context when we make a new library project with Cargo?

A test module with a test function in it is automatically generated for us. This module gives you a template for writing your tests so you don’t have to look up the exact structure and syntax every time you start a new project. You can add as many additional test functions and as many test modules as you want!

```sh
$ cargo new adder --lib
     Created library `adder` project
$ cd adder
```

```rust
// Filename: src/lib.rs
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
```

###### 325. Can we have a non-test function in a test module?

We might have non-test functions in the tests module to help set up common scenarios or perform common operations, so we always need to indicate which functions are tests.

[Ignoring Some Tests Unless Specifically Requested](https://doc.rust-lang.org/book/ch11-02-running-tests.html#ignoring-some-tests-unless-specifically-requested)

[See the documentation about benchmark tests ](https://doc.rust-lang.org/unstable-book/library-features/test.html)

[Documentation Comments as Tests](https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html#documentation-comments-as-tests)

###### 326. When tests fail?

Tests fail when something in the test function panics. Each test is run in a new thread, and when the main thread sees that a test thread has died, the test is marked as failed

```rust
// Filename: src/lib.rs
// This code panics!
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn exploration() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    fn another() {
        panic!("Make this test fail");
    }
}
```

###### 327. What is the `assert!` macro used for?

The assert! macro, provided by the standard library, is useful when you want to ensure that some condition in a test evaluates to true. We give the assert! macro an argument that evaluates to a Boolean. If the value is true, nothing happens and the test passes. If the value is false, the assert! macro calls panic! to cause the test to fail. Using the assert! macro helps us check that our code is functioning in the way we intend.

```rust
// Filename: src/lib.rs

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(larger.can_hold(&smaller)); // false
    }
}
```

###### 328. What is the `assert_eq!` and `assert_ne!` Macros used for?

to test for equality between the result of the code under test and the value you expect the code to return

```rust
Filename: src/lib.rs

pub fn add_two(a: usize) -> usize {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds_two() {
        let result = add_two(2);
        assert_eq!(result, 4); // assert_ne! macro will pass if the two values we give it are not equal and fail if they’re equal
    }
}
```

Under the surface, the assert_eq! and assert_ne! macros use the operators == and !=, respectively. When the assertions fail, these macros print their arguments using debug formatting, which means the values being compared must implement the PartialEq and Debug traits. All primitive types and most of the standard library types implement these traits. For structs and enums that you define yourself, you’ll need to implement PartialEq to assert equality of those types. You’ll also need to implement Debug to print the values when the assertion fails. Because both traits are derivable traits, as mentioned in Listing 5-12 in Chapter 5, this is usually as straightforward as adding the #[derive(PartialEq, Debug)] annotation to your struct or enum definition. See Appendix C, “Derivable Traits,” for more details about these and other derivable traits.

###### 329. How to add custom  Custom Failure Messages?

You can also add a custom message to be printed with the failure message as optional arguments to the assert!, assert_eq!, and assert_ne! macros.

```rust
pub fn greeting(name: &str) -> String {
    String::from("Hello!")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
            result.contains("Carol"),
            "Greeting did not contain name, value was `{result}`"
        );
    }
}
```

###### 330. How we can test that our code handles error conditions as we expect?

We do this by adding the attribute `should_panic` to our test function. The test passes if the code inside the function panics; the test fails if the code inside the function doesn’t panic.

```rust
Filename: src/lib.rs
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn greater_than_100() {
        Guess::new(200);
    }
}
```

###### 331. What needs to be done to make `should_panic` tests more precise?

A `should_panic` test would pass even if the test panics for a different reason from the one we were expecting. To make `should_panic` tests more precise, we can add an optional `expected` parameter to the `should_panic` attribute. The test harness will make sure that the failure message contains the provided text

```rust
// --snip--

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!(
                "Guess value must be greater than or equal to 1, got {value}."
            );
        } else if value > 100 {
            panic!(
                "Guess value must be less than or equal to 100, got {value}."
            );
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "less than or equal to 100")]
    fn greater_than_100() {
        Guess::new(200);
    }
```

###### 332. How we can use Result type for testing our code?

We must define the Result type as the return type of test and return `Err()` variant in case error and `Ok()` otherwise. 

```rust
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() -> Result<(), String> {
        let result = add(2, 2);

        if result == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
```

Writing tests so they return a `Result<T, E>` enables you to use the question mark operator in the body of tests, which can be a convenient way to write tests that should fail if any operation within them returns an Err variant.

You can’t use the `#[should_panic]` annotation on tests that use `Result<T, E>`. To assert that an operation returns an Err variant, don’t use the question mark operator on the Result<T, E> value. Instead, use assert!(value.is_err()).

#### 11.2 Controlling How Tests Are Run

###### 333. How default behavior of the binary produced by `cargo test`?

Run all the tests in parallel and capture output generated during test runs, preventing the output from being displayed and making it easier to read the output related to the test results.

###### 334. How to change default `cargo test` behavior?

Specify command line options to change this default behavior.

###### 335. How to separate command line options go to cargo test, and those that go to the resultant test binary

To separate these two types of arguments, you list the arguments that go to cargo test followed by the separator `--` and then the ones that go to the test binary. Running `cargo test --help` displays the options you can use with cargo test, and running `cargo test -- --help` displays the options you can use after the separator. Those options are also documented in the [“Tests” section](https://doc.rust-lang.org/rustc/tests/index.html) of the the [rustc book](https://doc.rust-lang.org/rustc/index.html).

###### 336. How by default Cargo run test?

by default they run in parallel using threads, meaning they finish running faster and you get feedback quicker

By default, if a test passes, Rust’s test library captures anything printed to standard output. For example, if we call println! in a test and the test passes, we won’t see the println! output in the terminal; we’ll see only the line that indicates the test passed. If a test fails, we’ll see whatever was printed to standard output with the rest of the failure message.

###### 337. How to run tests consistently?

you can send the `--test-threads` flag and the number of threads you want to use to the test binary.

```sh
$ cargo test -- --test-threads=1
```

###### 338. What we should do if wont to see printed values for passing tests?

we can tell Rust to also show the output of successful tests with `--show-output`:

```sh
$ cargo test -- --show-output
```

###### 339. How we can Running Single Tests?

We can pass the name of any test function to cargo test to run only that test

```rust
pub fn add_two(a: usize) -> usize {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_two_and_two() {
        let result = add_two(2);
        assert_eq!(result, 4);
    }

    #[test]
    fn add_three_and_two() {
        let result = add_two(3);
        assert_eq!(result, 5);
    }

    #[test]
    fn one_hundred() {
        let result = add_two(100);
        assert_eq!(result, 102);
    }
}
```

```sh
$ cargo test one_hundred
```

###### 340. How to Filtering to Run Multiple Tests?

We can specify part of a test name, and any test whose name matches that value will be run. For example, because two of our tests’ names contain `add`, we can run those two by running 

```sh
cargo test add
```

This command ran all tests with add in the name and filtered out the test named one_hundred. Also note that the module in which a test appears becomes part of the test’s name, so we can run all the tests in a module by filtering on the module’s name.

###### 341. How to Ignoring Some Tests?

We can  annotate the tests using the ignore attribute to exclude them

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    #[ignore]
    fn expensive_test() {
        // code that takes an hour to run
    }
}
```

###### 342. How we can run only tests marked as `ignored`?

we can use cargo test `-- --ignored`

```sh
cargo test -- --ignored
```

###### 343. How we can run all tests include marked as `ignored`?

you can run `cargo test -- --include-ignored`

#### 11.3 Test Organization

###### 344. What purpose of unit tests?

The purpose of unit tests is to test each unit of code in isolation from the rest of the code to quickly pinpoint where code is and isn’t working as expected.

###### 345. What convention fo organization unit tests?

The convention is put unit tests in the src directory in each file with the code that they’re testing, create a module named `tests` in each file to contain the test functions and to annotate the module with `cfg(test)`

```rust
// Filename: src/lib.rs


pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
```

###### 346. How role of `#[cfg(test)]` annotation?

The `#[cfg(test)]` annotation on the tests module tells Rust to compile and run the test code only when you run cargo test, not when you run cargo build.

###### 347. Should to test Private Functions?

There’s debate within the testing community about whether or not private functions should be tested directly, and other languages make it difficult or impossible to test private functions.

###### 348. Does allow Rust to test of Private Function?

Regardless of which testing ideology you adhere to, Rust’s privacy rules do allow you to test private functions.

```rust
Filename: src/lib.rs
pub fn add_two(a: usize) -> usize {
    internal_adder(a, 2)
}

fn internal_adder(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        let result = internal_adder(2, 2);
        assert_eq!(result, 4);
    }
}
```

###### 349. What is purpose of integration tests?

to test whether many parts of your library work together correctly. In Rust, integration tests are entirely external to your library. They use your library in the same way any other code would, which means they can only call functions that are part of your library’s public API. 

###### 350. Where are located integration tests?

We create a tests directory at the top level of our project directory, next to src. Cargo knows to look for integration test files in this directory.

```sh
adder
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── tests
    └── integration_test.rs
```

###### 351. How many files whit integration tests we can create?

We can make as many test files as we want

###### 352. How Cargo compile files whit integration tests?

Cargo will compile each of the files as an individual crate, so we need to bring our library into each test crate’s scope

```rust
// Filename: tests/integration_test.rs

use adder::add_two;

#[test]
fn it_adds_two() {
    let result = add_two(2);
    assert_eq!(result, 4);
}
```

###### 353. Should we annotate any code in integration tests with `#[cfg(test)]`?

We don’t need to annotate any code in tests/integration_test.rs with `#[cfg(test)]`. Cargo treats the tests directory specially and compiles files in this directory only when we run `cargo test`. Run cargo test now:

```rust
$ cargo test
```

###### 354. How we can run a particular integration test function?

We can run a particular integration test function by specifying the test function’s name as an argument to `cargo test`

```sh
cargo test it_adds_two
```

###### 355. How we can run all function in particular integration test file?

To run all the tests in a particular integration test file, use the `--test` argument of `cargo test` followed by the name of the file:

```sh
$ cargo test --test integration_test
```

###### 356. How we can make shared code for integrated tests?

Each file in the tests directory is compiled as its own separate crate. This means that files in the tests directory don’t share the same behavior as files in src do, regarding how to separate code into modules and files.

In case if we wont to have shared code we must take it out to `common/mod.rs` file. This older naming convention for modules that Rust also understands.

```sh
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── tests
    ├── common
    │   └── mod.rs
    └── integration_test.rs
```

After we move shared code to `common/mod.rs` file we can use it from any of the integration test files as a module.

```rust
// Filename: tests/common/mod.rs

pub fn setup() {
    // setup code specific to your library's tests would go here
}
```


```rust
// Filename: tests/integration_test.rs


use adder::add_two;

mod common;

#[test]
fn it_adds_two() {
    common::setup();

    let result = add_two(2);
    assert_eq!(result, 4);
}
```

```sh
$ cargo test
```

###### 357. How can we make integration testing of binary crates?

If our project is a binary crate that only contains a src/main.rs file and doesn’t have a src/lib.rs file, we can’t create integration tests in the tests directory and bring functions defined in the src/main.rs file into scope with a use statement. Only library crates expose functions that other crates can use; binary crates are meant to be run on their own.

This is one of the reasons Rust projects that provide a binary have a straightforward src/main.rs file that calls logic that lives in the src/lib.rs file. Using that structure, integration tests can test the library crate with use to make the important functionality available. If the important functionality works, the small amount of code in the src/main.rs file will work as well, and that small amount of code doesn’t need to be tested.

### 12 An I/O Project: Building a Command Line Program

#### 12.1 Accepting Command Line Arguments

###### 358. How we can pass command line arguments our program when running `cargo run`?

two hyphens to indicate the following arguments are for our program rather than for `cargo`, a string to search for, and a path to a file to search in

```sh
$ cargo run -- searchstring example-filename.txt
```

###### 359. Where we can look for existing libraries for our needs?

Some existing libraries on crates.io can help with writing a programs.

###### 360. Which Rust standard library function can we use to read the values ​​of command line arguments?

`std::env::args` function. This function returns an iterator of the command line arguments passed to program.

```rust
// Filename: src/main.rs
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(args);
}
```

###### 361. What does the `args().collect()` method do?

This function returns an iterator of the command line arguments passed to program.

#### 12.2 Reading a File

###### 362. How we can read file to string?

`std::fs::read_to_string` function takes the file_path, opens that file, and returns a value of type `std::io::Result<String>` that contains the file’s contents.

```txt
<!-- Filename: poem.txt -->

I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!
```

```rust
use std::env;
use std::fs;

fn main() {
    // --snip--
    println!("In file {file_path}");

    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");

    println!("With text:\n{contents}");
}
```

#### 12.3 Refactoring to Improve Modularity and Error Handling

###### 363. Why refactor?

As our program grows, the number of separate tasks the main function handles will increase. As a function gains responsibilities, it becomes more difficult to reason about, harder to test, and harder to change without breaking one of its parts. It’s best to separate functionality so each function is responsible for one task.

###### 364. What is main Rust pattern about separating concerns?

main.rs handles running the program and lib.rs handles all the logic of the task at hand. Because you can’t test the main function directly, this structure lets you test all of your program’s logic by moving it into functions in lib.rs. The code that remains in main.rs will be small enough to verify its correctness by reading it.

###### 365. How we can do refactoring?

move some functionality to function

```rust
// Filename: src/main.rs
fn main() {
    let args: Vec<String> = env::args().collect();

    let (query, file_path) = parse_config(&args);

    // --snip--
}

fn parse_config(args: &[String]) -> (&str, &str) {
    let query = &args[1];
    let file_path = &args[2];

    (query, file_path)
}
```

Grouping Related Values to Struct

```rust
// Filename: src/main.rs
fn main() {
    let args: Vec<String> = env::args().collect();

    let config = parse_config(&args);

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    let contents = fs::read_to_string(config.file_path)
        .expect("Should have been able to read the file");

    // --snip--
}

struct Config {
    query: String,
    file_path: String,
}

fn parse_config(args: &[String]) -> Config {
    let query = args[1].clone();
    let file_path = args[2].clone();

    Config { query, file_path }
}
```

Creating a Constructor for Struct

```rust
// Filename: src/main.rs
fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args);

    // --snip--
}

// --snip--

impl Config {
    fn new(args: &[String]) -> Config {
        let query = args[1].clone();
        let file_path = args[2].clone();

        Config { query, file_path }
    }
}
```

Improving the Error Message

```rust
// Filename: src/main.rs
    // --snip--
    fn new(args: &[String]) -> Config {
        if args.len() < 3 {
            panic!("not enough arguments");
        }
        // --snip--
```

Returning a Result Instead of Calling panic!

```rust
// Filename: src/main.
// This code does not compile!rs
impl Config {
    fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        Ok(Config { query, file_path })
    }
}
```

Handling Errors

```rust
Filename: src/main.rs
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
```

Extracting Logic from main

```rust
fn main() {
    // --snip--

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    run(config);
}

fn run(config: Config) {
    let contents = fs::read_to_string(config.file_path)
        .expect("Should have been able to read the file");

    println!("With text:\n{contents}");
}

// --snip--
```

Returning Errors from the run Function

```rust
// Filename: src/main.rs
use std::error::Error;

// --snip--

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.file_path)?;

    println!("With text:\n{contents}");

    Ok(())
}
```

Handling Errors Returned from run in main

```rust
// Filename: src/main.rs

fn main() {
    // --snip--

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    if let Err(e) = run(config) {
        println!("Application error: {e}");
        process::exit(1);
    }
}
```

Splitting Code into a Library Crate

```rust
// Filename: src/lib.rs
// This code does not compile!
use std::error::Error;
use std::fs;

pub struct Config {
    pub query: String,
    pub file_path: String,
}

impl Config {
    pub fn build(args: &[String]) -> Result<Config, &'static str> {
        // --snip--
    }
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    // --snip--
}
```

```rust
Filename: src/main.rs
use std::env;
use std::process;

use minigrep::Config;

fn main() {
    // --snip--
    if let Err(e) = minigrep::run(config) {
        // --snip--
    }
}
```

#### 12.4 Developing the Library’s Functionality with Test-Driven Development

###### 366. What is TDD?

TDD is an acronym for Test-Driven Development. This is concept of write software  of writing the test before you write the code. The test-driven development (TDD) process with the following steps:

1. Write a test that fails and run it to make sure it fails for the reason you expect.
2. Write or modify just enough code to make the new test pass.
3. Refactor the code you just added or changed and make sure the tests continue to pass.
4. Repeat from step 1!

###### 367. How Write a Failing Test?

```rust
// Filename: src/lib.rs

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    vec![]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }
}
```

###### 368. How write code to pass the test?

```rust
// Filename: src/lib.rs
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    results
}
```

###### 369. Hwo Using the search Function in the run Function?

```rust
// Filename: src/lib.rs

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.file_path)?;

    for line in search(&config.query, &contents) {
        println!("{line}");
    }

    Ok(())
}
```

```sh
$ cargo run -- body poem.txt
```

#### 12.5 Working with Environment Variables

Writing a Failing Test for the Case-Insensitive search Function

```rust
// Filename: src/lib.rs
// This code does not compile!
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
Duct tape.";

        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }

    #[test]
    fn case_insensitive() {
        let query = "rUsT";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
Trust me.";

        assert_eq!(
            vec!["Rust:", "Trust me."],
            search_case_insensitive(query, contents)
        );
    }
}
```

Implementing the search_case_insensitive Function

```rust
Filename: src/lib.rs

pub fn search_case_insensitive<'a>(
    query: &str,
    contents: &'a str,
) -> Vec<&'a str> {
    let query = query.to_lowercase();
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.to_lowercase().contains(&query) {
            results.push(line);
        }
    }

    results
}
```

Let’s see if this implementation passes the tests:

```sh
$ cargo test
```

add a configuration option to the Config struct to switch between case-sensitive and case-insensitive search

```rust
// Filename: src/lib.rs

This code does not compile!
pub struct Config {
    pub query: String,
    pub file_path: String,
    pub ignore_case: bool,
}
```

```rust
// Filename: src/lib.rs

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.file_path)?;

    let results = if config.ignore_case {
        search_case_insensitive(&config.query, &contents)
    } else {
        search(&config.query, &contents)
    };

    for line in results {
        println!("{line}");
    }

    Ok(())
}
```

```rust
// Filename: src/lib.rs
use std::env;
// --snip--

impl Config {
    pub fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}
```

```sh
$ cargo run -- to poem.txt
$ IGNORE_CASE=1 cargo run -- to poem.txt
```



###### 370. What module contain features for dealing with environment variable?

`std::env`

Docs

<https://doc.rust-lang.org/std/env/index.html>


#### 12.6 Writing Error Messages to Standard Error Instead of Standard Output

###### 371. How make what our program print error massages to Standard Error Instead of Standard Output?

In cases where we want our program to print messages to standard error instead of standard output, we should use the `eprintln!` macros instead of `println!`.

```rust
Filename: src/main.rs

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    if let Err(e) = minigrep::run(config) {
        eprintln!("Application error: {e}");
        process::exit(1);
    }
}
```

```sh
$ cargo run > output.txt
Problem parsing arguments: not enough arguments
```

### 13 Functional Language Features: Iterators and Closures

#### 13.1 Closures: Anonymous Functions that Capture Their Environment

###### 372. What is Closures?

Rust’s closures are anonymous functions you can save in a variable or pass as arguments to other functions. You can create the closure in one place and then call the closure elsewhere to evaluate it in a different context. Unlike functions, closures can capture values from the scope in which they’re defined.

###### 373. Should we annotate the types of the parameters or return value of Closures?

Closures don’t usually require you to annotate the types of the parameters or the return value like fn functions do

###### 374. Why we do not require annotate the types of the parameters or return value of Closures?

Type annotations are required on functions because the types are part of an explicit interface exposed to your users. Defining this interface rigidly is important for ensuring that everyone agrees on what types of values a function uses and returns. Closures, on the other hand, aren’t used in an exposed interface like this: they’re stored in variables and used without naming them and exposing them to users of our library.

Closures are typically short and relevant only within a narrow context rather than in any arbitrary scenario. Within these limited contexts, the compiler can infer the types of the parameters and the return type, similar to how it’s able to infer the types of most variables (there are rare cases where the compiler needs closure type annotations too).

###### 375. Can we annotate the types of the parameters or return value of Closures?

As with variables, we can add type annotations if we want to increase explicitness and clarity at the cost of being more verbose than is strictly necessary.

```rust
Filename: src/main.rs
    let expensive_closure = |num: u32| -> u32 {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };
```

###### 376. How define Closure?

```rust
fn  add_one_v1   (x: u32) -> u32 { x + 1 } // function
let add_one_v2 = |x: u32| -> u32 { x + 1 }; // a fully annotated closure definition.
let add_one_v3 = |x|             { x + 1 }; // remove the type annotations from the closure definition.
let add_one_v4 = |x|               x + 1  ; // remove the brackets, which are optional because the closure body has only one expression
```

###### 377. What compiler determine parameters and return types of Closure?

For closure definitions, the compiler will infer one concrete type for each of their parameters and for their return value at compile time the first time the closure is used. Further usage Closure whit different types will result in compile error.

```rust
// Filename: src/main.rs
// This code does not compile!

    let example_closure = |x| x;

    let s = example_closure(String::from("hello"));
    let n = example_closure(5); // error
```

###### 378. How Closure capture environment values?

Closures can capture values from their environment in three ways, which directly map to the three ways a function can take a parameter:

- borrowing immutably,
- borrowing mutably,
- taking ownership.

###### 379. How does Closure determine what capture methods to use?

The closure will decide which capture methods to use based on what the body of the closure does with the captured values.

```rust
fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let only_borrows = || println!("From closure: {list:?}"); // closure captures the immutable reference to the vector named list because it only needs an immutable reference to print the value.

   // Because we can have multiple immutable references to list at the same time, list is still accessible from the code before the closure definition, after the closure definition but before the closure is called, and after the closure is called.

    println!("Before calling closure: {list:?}");
    only_borrows();
    println!("After calling closure: {list:?}");
}
```

```rust
// Filename: src/main.rs

fn main() {
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let mut borrows_mutably = || list.push(7); // closure body adds an element to the list vector. The closure now captures a mutable reference
   // Note that there’s no longer a println! between the definition and the call of the borrows_mutably closure: when borrows_mutably is defined, it captures a mutable reference to list. We don’t use the closure again after the closure is called, so the mutable borrow ends. Between the closure definition and the closure call, an immutable borrow to print isn’t allowed because no other borrows are allowed when there’s a mutable borrow.
    borrows_mutably();
    println!("After calling closure: {list:?}");
}
```

###### 380. What we should do whit ownership when passing a closure to a new thread?

We must force move values passed to closure by `move` keyword before the parameter list.

The new thread might finish before the rest of the main thread finishes, or the main thread might finish first. If the main thread maintained ownership of values passed to closure, but ended before the new thread did and dropped this values, the immutable references in the thread would be invalid.

```rust
// Filename: src/main.rs
use std::thread;

fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    thread::spawn(move || println!("From thread: {list:?}"))
        .join()
        .unwrap();
}
```

###### 381. What closure body can do whit captured value?

- move a captured value out of the closure
- mutate the captured value,
- neither move nor mutate the value, 
- capture nothing from the environment to begin with.

###### 382. What does it depend the way a closure captures and handles values from the environment?

How a closure captures and processes values ​​from the environment depends on what traits the closure implements. And accordingly, the trait that implement closures are what kinds of closures functions and struct can use.

###### 383. What does it depend what kinds of closures can use functions and struct?

What kinds of closures can use functions and struct depends on what traits the closure implements.

###### 384. Must we declare which traits must implement the closure?

Closures will automatically implement one, two, or all three of `Fn` traits, in an additive fashion, depending on how the closure’s body handles the values.

###### 385. Which traits can implement closure?

Closures will automatically implement one, two, or all three of `Fn` traits:

- `FnOnce` applies to closures that can be called once. All closures implement at least this trait, because all closures can be called. A closure that moves captured values out of its body will only implement FnOnce and none of the other Fn traits, because it can only be called once.
- `FnMut` applies to closures that don’t move captured values out of their body, but that might mutate the captured values. These closures can be called more than once.
- `Fn` applies to closures that don’t move captured values out of their body and that don’t mutate captured values, as well as closures that capture nothing from their environment. These closures can be called more than once without mutating their environment, which is important in cases such as calling a closure multiple times concurrently.

```rust
impl<T> Option<T> {
    pub fn unwrap_or_else<F>(self, f: F) -> T
    where
        F: FnOnce() -> T //The trait bound specified on the generic type F is FnOnce() -> T, which means F must be able to be called once, take no arguments, and return a T. Using FnOnce in the trait bound expresses the constraint that unwrap_or_else is only going to call f at most one time.
    {
        match self {
            Some(x) => x,
            None => f(),
        }
    }
}
```

###### 386. Which trait must implement closure that moves captured values out of its body?

A closure that moves captured values out of its body will only implement `FnOnce` and none of the other `Fn` traits, because it can only be called once.

###### 387. Which trait must implement closure that don’t move captured values out of their body, but that might mutate the captured values?

`FnMut` applies to closures that don’t move captured values out of their body, but that might mutate the captured values. These closures can be called more than once.

###### 388. Which trait must implement closure that don’t move captured values out of their body and that don’t mutate captured values, as well as capture nothing from their environment?

`Fn` applies to closures that don’t move captured values out of their body and that don’t mutate captured values, as well as closures that capture nothing from their environment. These closures can be called more than once without mutating their environment, which is important in cases such as calling a closure multiple times concurrently.

#### 13.2 Processing a Series of Items with Iterators

###### 389. What is the iterator pattern used for?

The iterator pattern allows you to perform some task on a sequence of items in turn. An iterator is responsible for the logic of iterating over each item and determining when the sequence has finished.

###### 390. What is means - iterators are lazy?

In Rust, iterators are lazy, meaning they have no effect until you call methods that consume the iterator to use it up.

###### 391. What is Iterator in Rust?

In rust Iterator is type that implement Iterator Trait.

```rust
pub trait Iterator {
    type Item;

   pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;

    // methods with default implementations elided
} fn next(&mut self) -> Option<Self::Item>;

    // methods with default implementations elided
}
```


###### 392. What method define Iterator Trait?

`fn next(&mut self) -> Option<Self::Item>;`

###### 393. How can we get immutable references to values ​​in vector using iterator syntax?

we must get mutable reference `mur_ref` from vector value by using `vec_var.iter()` and then using it by call method `mur_ref.next()`

```rust
    #[test]
    fn iterator_demonstration() {
        let v1 = vec![1, 2, 3];

        let mut v1_iter = v1.iter();

        assert_eq!(v1_iter.next(), Some(&1));
        assert_eq!(v1_iter.next(), Some(&2));
        assert_eq!(v1_iter.next(), Some(&3));
        assert_eq!(v1_iter.next(), None);
    }
```

###### 394. How can we get mutable references to values ​​in vector using iterator syntax?

we must get mutable reference `mut_ref` from vector value by using `vec_var.iter_mut()` and then using it by call method `mut_ref.next()`

###### 395. How can we get ownership of vector type and returns owned values using iterator syntax?

we can call `into_iter` instead of `iter` on the vector value

###### 396. What is 'consuming adapters' methods?

The Iterator trait has a number of different methods with default implementations provided by the standard library. Some of these methods use the `next` method, these are called 'consuming adapters' because their call uses the iterator. For example `sum` method.

###### 397. How the `sum` Iterator method works

the `sum` method 'consuming adapter' it takes ownership of the iterator and iterates through the items by repeatedly calling next, thus consuming the iterator. As it iterates through, it adds each item to a running total and returns the total when iteration is complete. We aren’t allowed to use v1_iter after the call to sum because sum takes ownership of the iterator we call it on.

```rust
//   Filename: src/lib.rs
    #[test]
    fn iterator_sum() {
        let v1 = vec![1, 2, 3];

        let v1_iter = v1.iter();

        let total: i32 = v1_iter.sum();

        assert_eq!(total, 6);
    }
```

###### 398. What is 'Iterator adapters' methods?

Iterator adapters are methods defined on the Iterator trait that don’t consume the iterator. Instead, they produce different iterators by changing some aspect of the original iterator. For example `map` method

###### 399. How the `map` Iterator method works?

method `map` are 'Iterator adapter' it takes a closure to call on each item as the items are iterated through. The `map` method returns a new iterator that produces the modified items. The closure here creates a new iterator in which each item from the vector will be incremented by 1

```rust
    #[test]
    fn iter_map() {
        let v = vec![1, 2, 3, 4, 5];

        let result: Vec<i32> = v.iter().map(|x| x + 1).collect();

        assert!(result == vec![2, 3, 4, 5, 6]);
    }
```

###### 400. How we must combine 'Iterator adapters' and 'consuming adapters' method?

You can chain multiple calls to 'iterator adapters' to perform complex actions in a readable way. But because all iterators are lazy, you have to call one of the consuming adapter methods to get results from calls to iterator adapters.

###### 401. Can we Using Closures that Capture Their Environment in iterators?

```rust
// Filename: src/lib.rs

#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes.into_iter().filter(|s| s.size == shoe_size).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn filters_by_size() {
        let shoes = vec![
            Shoe {
                size: 10,
                style: String::from("sneaker"),
            },
            Shoe {
                size: 13,
                style: String::from("sandal"),
            },
            Shoe {
                size: 10,
                style: String::from("boot"),
            },
        ];

        let in_my_size = shoes_in_size(shoes, 10);

        assert_eq!(
            in_my_size,
            vec![
                Shoe {
                    size: 10,
                    style: String::from("sneaker")
                },
                Shoe {
                    size: 10,
                    style: String::from("boot")
                },
            ]
        );
    }
}
```

###### 402. How the `filter` Iterator method works?

The `filter` method takes a closure. The closure gets an item from the iterator and returns a `bool`. If the closure returns `true`, the value will be included in the iteration produced by filter. If the closure returns `false`, the value won’t be included.

#### 13.3 Improving Our I/O Project

Removing a clone Using an Iterator

```rust
// Filename: src/lib.rs

impl Config {
    pub fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }
        // We needed clone here because we have a slice with String elements in the parameter args, but the build function doesn’t own args. To return ownership of a Config instance, we had to clone the values from the query and file_path fields of Config so the Config instance can own its values.
        let query = args[1].clone(); 
        let file_path = args[2].clone();

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}
```

```rust
// Filename: src/main.rs

fn main() {

    let config = Config::build(env::args()).unwrap_or_else(|err| { // The standard library documentation for the env::args function shows that the type of the iterator it returns is std::env::Args, and that type implements the Iterator trait and returns String values. 
        eprintln!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
}
```

```rust
Filename: src/lib.rs

impl Config {
    pub fn build(
        mut args: impl Iterator<Item = String>, // Because we’re taking ownership of args and we’ll be mutating args by iterating over it, we can add the mut keyword into the specification of the args parameter to make it mutable
    ) -> Result<Config, &'static str> {
        args.next();

        let query = match args.next() {
            Some(arg) => arg,
            None => return Err("Didn't get a query string"),
        };

        let file_path = match args.next() {
            Some(arg) => arg,
            None => return Err("Didn't get a file path"),
        };

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}
```

Making Code Clearer with Iterator Adapters

```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}
```

#### 13.4 Comparing Performance: Loops vs. Iterators

###### 403. What code implementation faster on: `for loop` or Iterators?

iterators, although a high-level abstraction, get compiled down to roughly the same code as if you’d written the lower-level code yourself. Iterators are one of Rust’s zero-cost abstractions, by which we mean using the abstraction imposes no additional runtime overhead.
The implementations of closures and iterators are such that runtime performance is not affected.

###### 404. What is 'zero-cost abstractions'?

This mean using the abstraction imposes no additional runtime overhead

### 14 More About Cargo and Crates.io

full explanation of all Cargo features, see its [documentation](https://doc.rust-lang.org/cargo/).

#### 14.1 Customizing Builds with Release Profiles

For the full list of configuration options and defaults for each profile, see Cargo’s [documentation](https://doc.rust-lang.org/cargo/reference/profiles.html).

###### 405. What is 'release profiles'?

In Rust, release profiles are predefined and customizable profiles with different configurations that allow a programmer to have more control over various options for compiling code.

###### 406. What release profiles exist?

- the `dev` profile Cargo uses when you run `cargo build`. The `dev` profile is defined with good defaults for development
- the `release` profile Cargo uses when you run `cargo build --release`. the release profile has good defaults for release builds.
- `test`
- `bench`

###### 407. What happen if we add `[profile.*]` sections for any profile?

Cargo has default settings for each of the profiles that apply when you haven’t explicitly added any `[profile.*]` sections in the project’s Cargo.toml file. By adding `[profile.*]` sections for any profile you want to customize, you override any subset of the default settings.

```toml
# Filename: Cargo.toml

[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
```

###### 408. What controls the `opt-level` profile setting? 

The `opt-level` setting controls the number of optimizations Rust will apply to your code, with a range of 0 to 3. Applying more optimizations extends compiling time, so if you’re in development and compiling your code often, you’ll want fewer optimizations to compile faster even if the resulting code runs slower. The default opt-level for dev is therefore 0. When you’re ready to release your code, it’s best to spend more time compiling. You’ll only compile in release mode once, but you’ll run the compiled program many times, so release mode trades longer compile time for code that runs faster. That is why the default opt-level for the release profile is 3.

#### 14.2 Publishing a Crate to Crates.io

###### 409. what are documentation comments for?

they will generate HTML documentation. HTML displays the contents of documentation comments for public API elements, intended for programmers interested in how to use your container, rather than how it is implemented.

###### 410. how are documentation comments pointed?

Documentation comments use three slashes, `///`. Place documentation comments just before the item they’re documenting.

```rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
    x + 1
}
```

###### 411. what markup can be used in documentation comments?

Markdown

###### 412. what sections can be used in documentation?

- **Examples**
- **Panics**: The scenarios in which the function being documented could panic. Callers of the function who don’t want their programs to panic should make sure they don’t call the function in these situations.
- **Errors**: If the function returns a Result, describing the kinds of errors that might occur and what conditions might cause those errors to be returned can be helpful to callers so they can write code to handle the different kinds of errors in different ways.
- **Safety**: If the function is unsafe to call (we discuss unsafety in Chapter 20), there should be a section explaining why the function is unsafe and covering the invariants that the function expects callers to uphold.

###### 413. How we can tests code in documentation comments?

We must add Example section of 'documentation comments' and inside this section, using markdown syntax, write code that can be used as test.  If we run cargo test with the documentation we will see the section Doc-tests in the test results.
Now if we change either the function or the example so the assert_eq! in the example panics and run cargo test again, we’ll see that the doc tests catch that the example and the code are out of sync with each other!

###### 414. how to create a doc comment that does not refer to a specific code?

The style of doc comment `//!` adds documentation to the item that contains the comments rather than to the items following the comments. We typically use these doc comments inside the crate root file (src/lib.rs by convention) or inside a module to document the crate or the module as a whole.

Filename: src/lib.rs

```rust
//! # My Crate
//!
//! `my_crate` is a collection of utilities to make performing certain
//! calculations more convenient.

/// Adds one to the number given.
// --snip--
```

###### 415. How to remove the internal organization from the public AP?

We can modify the crate top level module code to add pub use statements to re-export the items placed at the below level. The API documentation that `cargo doc` generates for this crate will now list and link re-exports on the front page.
The crate users can still see and use the internal structure or they can use the more convenient structure re-exports structure.


```rust
Filename: src/lib.rs
//! # Art
//!
//! A library for modeling artistic concepts.

pub mod kinds {
    /// The primary colors according to the RYB color model.
    pub enum PrimaryColor {
        Red,
        Yellow,
        Blue,
    }

    /// The secondary colors according to the RYB color model.
    pub enum SecondaryColor {
        Orange,
        Green,
        Purple,
    }
}

pub mod utils {
    use crate::kinds::*;

    /// Combines two primary colors in equal amounts to create
    /// a secondary color.
    pub fn mix(c1: PrimaryColor, c2: PrimaryColor) -> SecondaryColor {
        // --snip--
    }
}

// Filename: src/main.rs
use art::kinds::PrimaryColor;
use art::utils::mix;

fn main() {
    let red = PrimaryColor::Red;
    let yellow = PrimaryColor::Yellow;
    mix(red, yellow);
}
```

```rust
// Filename: src/lib.rs

//! # Art
//!
//! A library for modeling artistic concepts.

pub use self::kinds::PrimaryColor;
pub use self::kinds::SecondaryColor;
pub use self::utils::mix;

pub mod kinds {
    // --snip--
}

pub mod utils {
    // --snip--
}

// Filename: src/main.rs

use art::mix;
use art::PrimaryColor;

fn main() {
    // --snip--
}
```

###### 416. How to Setting Up a Crates.io Account?

- visit the home page at crates.io
- log in via a GitHub account.
- visit your account settings at https://crates.io/me/ and retrieve your API key. - run the cargo login command
- paste your API key when prompted

```sh
$ cargo login
abcdefghijklmnopqrstuvwxyz012345
```

This command will inform Cargo of your API token and store it locally in `~/.cargo/`credentials. Note that this token is a secret: do not share it with anyone else. If you do share it with anyone for any reason, you should revoke it and generate a new token on crates.io.

###### 417. How to Publishing a Crate to Crates.io?

- create Crates.io account
- saved your API token
- Add Metadata to a Crate

  ```toml
  [package]
  name = "guessing_game"
  version = "0.1.0"
  edition = "2021"
  description = "A fun game where you guess what number the computer has chosen."
  license = "MIT OR Apache-2.0"

  [dependencies]
  ```

- Run the `cargo publish` command

###### 418. How Publishing a New Version of an Existing Crate?

change the version value specified in your Cargo.toml file and republish

###### 419. what are the versification rules,

Use the [Semantic Versioning rules](http://semver.org/)

###### 420. How to prevent any future projects from adding Deprecating Crate Versions as a new dependency?

run cargo yank and specify which version you want to yank.

```sh
run `cargo yank` and specify which version you want to yank. 
$ cargo yank --vers 1.0.1
    Updating crates.io index
        Yank guessing_game@1.0.1
```

By adding --undo to the command, you can also undo a yank and allow projects to start depending on a version again:

```sh
$ cargo yank --vers 1.0.1 --undo
    Updating crates.io index
      Unyank guessing_game@1.0.1
```

###### 421. What is 'yanking a crate version'?

Although you can’t remove previous versions of a crate, you can prevent any future projects from adding them as a new dependency. This is useful when a crate version is broken for one reason or another. In such situations, Cargo supports yanking a crate version.
Yanking a version prevents new projects from depending on that version while allowing all existing projects that depend on it to continue. Essentially, a yank means that all projects with a Cargo.lock will not break, and any future Cargo.lock files generated will not use the yanked version.

#### 14.3 Cargo Workspaces

###### 422. What is Cargo Workspace?

As your project develops, you might find that the library crate continues to get bigger and you want to split your package further into multiple library crates. Cargo offers a feature called workspaces that can help manage multiple related packages that are developed in tandem.
A workspace is a set of packages that share the same Cargo.lock and output directory.

###### 423. How to create a Workspace?

- First we must create workspace directory

```sh
$ mkdir add
$ cd add
```

- In workspace directory we create Cargo.toml file.

```sh
$ touch Cargo.toml
```
  
- In Cargo.toml file we must create `[workspace]` section. Workspace Cargo.toml file do not contain section `[package]`. In `[workspace]` section we point the latest and greatest version of Cargo’s resolver algorithm

```toml
# add/Cargo.toml file

[workspace]
resolver = "2"
```

###### 424. How to create package in Workspace?

When we have a Workspace and and we are in Workspace directory, we can create a binary or library crate by running `cargo new package_name [--lib]` within the workspace directory. This automatically adds the newly created package to the `members` key in the `[workspace]` section in the workspace Cargo.toml file

```sh
cargo new adder
```

```toml
# add/Cargo.toml file

[workspace]
resolver = "2"
members = ["adder"]
```

###### 425. What we can build Workspace?

We can build a workspace by running `cargo build` command in top-level Workspace dir

###### 426. Which file and directories does `cargo build` create in Workspace?

`Cargo.lock` file and `target` dir

```sh
cargo build
tree -L 3
├── Cargo.lock
├── Cargo.toml
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
    ├── CACHEDIR.TAG
    └── debug
        ├── adder
        ├── adder.d
        ├── build
        ├── deps
        ├── examples
        └── incremental
```

###### 427. How many packages we can create in Workspace?

We can create many packages in Workspace. All packages will be automatically added to the `members` key in the `[workspace]` section in the workspace Cargo.toml and will use the same Cargo.lock file and `target` directory.

```sh
$ cargo new adder
$ cargo new add_one --lib
$ tree -L 3
.
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
├── add_one
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── Cargo.toml
└── target

```

```toml
# Filename: Cargo.toml

[workspace]
resolver = "2"
members = ["adder", "add_one"]
```

###### 428. What files and directories shares all packages in Workspace?

All packages in workspace shares `Cargo.lock` file and `target` directory.

###### 429. What should we do if our container code depends on code from another Workspace package?

- If our crate code depends on code from another Workspace package, we should specify that package in the `[dependencies]` section of our crate package's Cargo.toml file. In this case, we specify the relative path to the package that we will reference in our code

```rust
// Filename: add_one/src/lib.rs
pub fn add_one(x: i32) -> i32 {
    x + 1
}
```

```toml
# Filename: adder/Cargo.toml

[dependencies]
add_one = { path = "../add_one" }
```

```rust
// Filename: adder/src/main.rs
fn main() {
    let num = 10;
    println!("Hello, world! {num} plus one is {}!", add_one::add_one(num));
}
```

- Then we can build Workspace in the top-level Workspace directory

```sh
$ cargo build
```

###### 430. How we should run binary crate in Workspace?

To run a binary crate in Workspace, we should specify which package in the workspace we want to run by using the `-p` argument and the package name with `cargo run`:

```sh
$ cargo run -p adder
```

###### 431. How we should add dependencies in Workspace packages?

We should add the dependency to the Cargo.toml file of each package where this dependency is required.

```toml
# Filename: add_one/Cargo.toml

[dependencies]
rand = "0.8.5"
```

###### 432. Where located Cargo.lock file of Workspace package?

Workspace has only one Cargo.lock file at the top level, rather than having a Cargo.lock in each crate’s directory. This ensures that all crates are using the same version of all dependencies.

###### 433. What happen If crates in the workspace specify incompatible versions of the same dependency?

Cargo will resolve each of them, but will still try to resolve as few versions as possible.

###### 434. How we can run tests in Workspace?

If we call `cargo test` command  in top-level Workspace dir - cargo execute test in all Workspace packages. We can add `-p` flag whit name of a package - in this case cargo execute only tests specified package.

###### 435. How we should publish Workspace crate?

If we wont publish Workspace crates to crates.io, we should each crate in the workspace publish separately. We can publish a particular crate in our workspace by using the `-p` flag and specifying the name of the crate we want to publish.

#### 14.5 Installing Binaries with cargo install

###### 436. For what used `cargo install` command?

The cargo install command allows you to install and use binary crates locally. This isn’t intended to replace system packages; it’s meant to be a convenient way for Rust developers to install tools that others have shared on crates.io. Note that you can only install packages that have binary targets.

###### 437. How we can install a binary cartes locally?

The cargo install command allows you to install and use binary crates locally.

###### 438. What is 'binary target'?

A binary target is the runnable program that is created if the crate has a src/main.rs file or another file specified as a binary, as opposed to a library target that isn’t runnable on its own but is suitable for including within other programs

###### 439. Where is information about crate target?

Usually, crates have information in the README file about whether a crate is a library, has a binary target, or both.

###### 440. Where are a binaries installed with `cargo install` stored?

All binaries installed with cargo install are stored in the installation root’s bin folder. If you installed Rust using `rustup.rs` and don’t have any custom configurations, this directory will be `$HOME/.cargo/bin`. Ensure that directory is in your $PATHto be able to run programs you’ve installed with `cargo install`.

```sh
$ cargo install ripgrep
    Updating crates.io index
  Downloaded ripgrep v13.0.0
  Downloaded 1 crate (243.3 KB) in 0.88s
  Installing ripgrep v13.0.0
--snip--
   Compiling ripgrep v13.0.0
    Finished `release` profile [optimized + debuginfo] target(s) in 10.64s
  Installing ~/.cargo/bin/rg
   Installed package `ripgrep v13.0.0` (executable `rg`) # shows the location and the name of the installed binary

$ rg --help
...
```

#### 14.6 Extending Cargo with Custom Commands

###### 441. How we can extend Cargo with new subcommands without having to modify Cargo?

We can use `cargo install` to install extensions and then run them just like the built-in Cargo tools. If a binary in our $PATH is named `cargo-something`, you can run it as if it was a Cargo subcommand by running `cargo something`. Custom commands like this are also listed when you run `cargo --list`.

### 15 Smart Pointers.

###### 442. What is a Pointer?

A pointer is a general concept for a variable that contains an address in memory. This address refers to, or “points at,” some other data.

###### 443. How Pointers implemented in Rust?

The most common kind of pointer in Rust is a reference. References are indicated by the & symbol and borrow the value they point to. They don’t have any special capabilities other than referring to data, and have no overhead.

###### 444. What is 'Smart Pointers'?

Smart pointers, on the other hand, are data structures that act like a pointer but also have additional metadata and capabilities. Rust, with its concept of ownership and borrowing, has an additional difference between references and smart pointers: while references only borrow data, in many cases, smart pointers own the data they point to.

###### 445. How Smart Pointers implemented in Rust?

Smart pointers are usually implemented using structs. Unlike an ordinary struct, smart pointers implement the `Deref` and `Drop` traits.

###### 446. What role `Deref` trait in Smart pointers?

The Deref trait allows an instance of the smart pointer struct to behave like a reference so you can write your code to work with either references or smart pointers. 

###### 447. What role `Drop` trait in Smart pointers?

The Drop trait allows you to customize the code that’s run when an instance of the smart pointer goes out of scope.

#### 15.1 Using `Box<T>` to Point to Data on the Heap

###### 448. What is `Box<T>` type?

The `Box<T>` type is a smart pointer because it implements the Deref trait, which allows `Box<T>` values to be treated like references. When a `Box<T>` value goes out of scope, the heap data that the box is pointing to is cleaned up as well because of the Drop trait implementation. Boxes allow you to store data on the heap rather than the stack.

###### 449. Why use `Box<T>`?

Boxes allow you to store data on the heap rather than the stack. What remains on the stack is the pointer to the heap data. Refer Boxes don’t have performance overhead, other than storing their data on the heap instead of on the stack. But they don’t have many extra capabilities either.

- When you have a type whose size can’t be known at compile time and you want to use a value of that type in a context that requires an exact size
- When you have a large amount of data and you want to transfer ownership but ensure the data won’t be copied when you do so
- When you want to own a value and you care only that it’s a type that implements a particular trait rather than being of a specific type

###### 450. How define Box value?

We define a variable to have the value of a Box that point to the some value, which is located on the heap.

```rust
// Filename: src/main.rs
fn main() {
    let b = Box::new(5);
    println!("b = {b}");
}
```

###### 451. What is recursive type?

A value of recursive type can have another value of the same type as part of itself.

###### 452. Why Recursive types pose an issue?

At compile time Rust needs to know how much space a type takes up. However, the nesting of values of recursive types could theoretically continue infinitely, so Rust can’t know how much space the value needs.

###### 453. How does Box solve issue of Recursive types?

nesting of values of recursive types could theoretically continue infinitely, so Rust can’t know how much space the value needs. Because boxes have a known size, we can enable recursive types by inserting a box in the recursive type definition.

###### 454. What is Cons List?

A cons list is a data structure that comes from the Lisp programming language and is made up of nested pairs. Each item in a cons list contains two elements: the value of the current item and the next item. The last item in the list contains only a value called Nil without a next item.

For example, here’s a pseudocode representation of a cons list containing the list 1, 2, 3 with each pair in parentheses:

(1, (2, (3, Nil)))

###### 455. How Rust determine how much space to allocate for a Enum?

Rust goes through each variant of the Enum to see which variant requires more space. Rust will use the larger size to store the Enum variants.

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

###### 456. How to define Cons List by using Enum?

We define Enum whit two variant: First for pair whit value and nested pair that implemented as Box type whit this Enum type, Second for Nil value.

```rust
Filename: src/main.rs

enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}
```

#### 15.2 Treating Smart Pointers Like Regular References with the Deref Trait

###### 457. What is Dereference operator?

Dereference operator id depicted as "*", applying it to a reference, we obtain the value contained in that reference.

```rust
Filename: src/main.rs
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

###### 458. What types can we apply the dereference operator to?

We can apply the dereference operator to a regular reference and to types that implements Deref trait

```rust
// Filename: src/main.rs

use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

###### 459. How Rust dereference Deref implementing types?

Rust substitutes the `*` operator with a call to the `deref` method and then a plain dereference so we don’t have to think about whether or not we need to call the deref method. This Rust feature lets us write code that functions identically whether we have a regular reference or a type that implements Deref.

```rust
fn main() {
    let y = Box::new(5);
    
    assert_eq!(5, *y); // *(y.deref())
}
```

###### 460. Whether the '*' operator is applied recursively to values ​​returned from the `deref` method?

the `*` operator is replaced with a call to the `deref` method and then a call to the `*` operator just once, each time we use a `*` in our code. Substitution of the `*` operator does not recurse infinitely.

###### 461. What is 'Deref coercion'?

Deref coercion is conversion a reference to a type that implements the Deref trait into a reference to another type. For example, deref coercion can convert &String to &str because String implements the Deref trait such that it returns &str.

###### 462. Where used 'Deref coercion'?

Deref coercion is a convenience Rust performs on arguments to functions and methods, and works only on types that implement the Deref trait. It happens automatically when we pass a reference to a particular type’s value as an argument to a function or method that doesn’t match the parameter type in the function or method definition. A sequence of calls to the deref method converts the type we provided into the type the parameter needs.

```rust
Filename: src/main.rs

fn hello(name: &str) {
    println!("Hello, {name}!");
}

fn main() {
    let m = MyBox::new(String::from("Rust"));
    hello(&m); // hello(&(*m)[..]); The (*m) dereferences the MyBox<String> into a String. Then the & and [..] take a string slice of the String that is equal to the whole string to match the signature of hello
}
```

When the Deref trait is defined for the types involved, Rust will analyze the types and use Deref::deref as many times as necessary to get a reference to match the parameter’s type.

###### 463. How we can override `*` operator on mutable reference?

We should implement DerefMut trait on type that value we are using whit the mut reference.

###### 464. What result type of Deref Coercion for &T?

&U when &T: Deref<Target=U>

###### 465. What result type of Deref Coercion for mut& T?

- &mut U if T: DerefMut<Target=U>
- &U if T: Deref<Target=U>

#### 15.3 Running Code on Cleanup with the Drop Trait

###### 466. For what to use Drop Trait?

Drop Trait lets you customize what happens when a value is about to go out of scope. You can provide an implementation for the Drop trait on any type, and that code can be used to release resources like files or network connections. You specify the code to run when a value goes out of scope by implementing the Drop trait.

###### 467. what is required to implement Drop trait?

The Drop trait requires you to implement one method named `drop` that takes a mutable reference to `self`.

###### 468. How is the `drop` method of the Drop feature called?

Rust automatically called `drop` for us when our instances went out of scope, calling the code we specified in.

###### 469. How can we manually drop a value?

 you have to call the `std::mem::drop` function provided by the standard library if you want to force a value to be dropped before the end of its scope.

```rust
fn main() {
    let c = CustomSmartPointer {
        data: String::from("some data"),
    };
    println!("CustomSmartPointer created.");
    // c.drop(); error
    drop(c); // The function is in the prelude
    println!("CustomSmartPointer dropped before the end of main.");
}
```

#### 15.4 `Rc<T>`, the Reference Counted Smart Pointer

###### 470. when a single value might have multiple owners?

 For example, in graph data structures, multiple edges might point to the same node, and that node is conceptually owned by all of the edges that point to it. A node shouldn’t be cleaned up unless it doesn’t have any edges pointing to it and so has no owners.

###### 471. How we can enable multiple ownership?

You have to enable multiple ownership explicitly by using the Rust type `Rc<T>`, which is an abbreviation for reference counting.

###### 472. What does `Rc<T>` type?

The `Rc<T>` type keeps track of the number of references to a value to determine whether or not the value is still in use. If there are zero references to a value, the value can be cleaned up without any references becoming invalid.

###### 473. Can we use `Rc<T>` in multi-threaded scenarios?

We can use `Rc<T>` only in single-threaded scenarios

###### 474. How we can use `Rc<T>` to Share Data?

We should use `Rc::new(Some_data)` and `Rc::clone(&ref)` methods  allowing a single value to have multiple owners, and ensures that the value remains valid as long as any of the owners still exist.

```rust
// Filename: src/main.rs

enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}
```

```sh
$ cargo run
   Compiling cons-list v0.1.0 (file:///projects/cons-list)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.45s
     Running `target/debug/cons-list`
count after creating a = 1
count after creating b = 2
count after creating c = 3
count after c goes out of scope = 2
```

When b and then a go out of scope at the end of main, the count is then 0, and the Rc<List> is cleaned up completely. 

#### RefCell<T> and the Interior Mutability Pattern

###### 475. What is 'Interior mutability'?

Interior mutability is a design pattern in Rust that allows you to mutate data even when there are immutable references to that data; normally, this action is disallowed by the borrowing rules.
Mutating the value inside an immutable value is the interior mutability pattern.

###### 476. How implemented the Interior mutability pattern?

To mutate data, the pattern uses unsafe code inside a data structure to bend Rust’s usual rules that govern mutation and borrowing.

###### 477. What is 'unsafe code'?

Unsafe code indicates to the compiler that we’re checking the rules manually instead of relying on the compiler to check them for us

###### 478. When can we use Interior mutability pattern?

We can use types that use the interior mutability pattern only when we can ensure that the borrowing rules will be followed at runtime, even though the compiler can’t guarantee that. The unsafe code involved is then wrapped in a safe API, and the outer type is still immutable.

###### 479. What difference between references, `Box<T>` and `RefCell<T>`?

With references and `Box<T>`, the borrowing rules’ invariants are enforced at compile time. With `RefCell<T>`, these invariants are enforced at runtime. With references, if you break these rules, you’ll get a compiler error. With `RefCell<T>`, if you break these rules, your program will panic and exit.

###### 480. What could be the advantage of checking the borrowing rules at runtime?

The advantage of checking the borrowing rules at runtime is that certain memory-safe scenarios are then allowed, where they would’ve been disallowed by the compile-time checks. Static analysis, like the Rust compiler, is inherently conservative. Some properties of code are impossible to detect by analyzing the code.

###### 481. When the `RefCell<T>` type is useful?

The `RefCell<T>` type is useful when you’re sure your code follows the borrowing rules but the compiler is unable to understand and guarantee that. `RefCell<T>` allows mutable borrows checked at runtime, you can mutate the value inside the `RefCell<T>` even when the `RefCell<T>` is immutable.

###### 482. Can we use `RefCell<T>` type in multi-thread scenarios?

Similar to `Rc<T>`, `RefCell<T>` is only for use in single-threaded scenarios and will give you a compile-time error if you try using it in a multithreaded context.

###### 483. How we can use `RefCell<T>` type to mutate immutable value.

We must create a value of type `RefCell<T>` that contains a target value of some type. We can then use that value either by itself or as part of another value used in an immutable context, i.e. passed with the `&` sign. When we call `borrow_mut()` on a value of type `RefCell<T>`, we get a mutable reference to the value inside, when we call `borrow()` on a value of type `RefCell<T>`, we get an immutable reference to the value inside. We cannot violate the borrow rules when using references obtained through `RefCell<T>` value.

```rust
pub trait Messenger {
    fn send(&self, msg: &str) // the interface our mock object needs to implement so that the mock can be used in the same way a real object is
}

pub str LimitTracker<'a T: Messenger> {
    messenger: &'a T,
    value: usize,
    max: usize,
}

impl<'a T> LimitTracker<'a T>
where
    T: Messenger,
{
    pub fn new(messenger: &'a T, max: usize) -> LimitTracker<'a T> {
        LimitTracker {
            messenger,
            value: 0,
            max,
        }
    }

    pub fn set_value(&mut self, value: usize) {
        self.value = value;

        let percentage_of_max = self.value as f64 / self.max as f64;

        if percentage_of_max >= 1.0 {
            self.messenger.send("Error: You are over your quota!");
        } else if percentage_of_max >= 0.9 {
            self.messenger
                .send("Urgent warning: You've used up over 90% of your quota!");
        } else if percentage_of_max >= 0.75 {
            self.messenger
                .send("Warning: You've used up over 75% of your quota!");
        }
    }  
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;

    struct MockMessenger { // We need a mock object that, instead of sending an email or text message when we call send, will only keep track of the messages it’s told to send. 
        // sent_messages: Vec<String>,
        sent_messages: RefCell<Vec<String>>, // The sent_messages field is now of type RefCell<Vec<String>> instead of Vec<String
    }

    impl MockMessenger {
        fn new() -> MockMessenger { 
                // sent_messages: vec![]
                sent_messages: RefCell::new(vec![]), // we create a new RefCell<Vec<String>> instance around the empty vector.
            }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&self, message: &str) {
            // self.sent_messages.push(String::from(message)); `self` is a `&` reference, so the data it refers to cannot be borrowed as mutable
            self.sent_messages.borrow_mut().push(String::from(message)); //We call borrow_mut on the RefCell<Vec<String>> in self.sent_messages to get a mutable reference to the value inside the RefCell<Vec<String>>, which is the vector. Then we can call push on the mutable reference to the vector to keep track of the messages sent during the test.
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMessenger::new();
        let mut limit_tracker = LimitTracker::new(&mock_messenger, 100);

        limit_tracker.set_value(80);
        // assert_eq!(mock_messenger.sent_messages.len(), 1); 
        assert_eq!(mock_messenger.sent_messages.borrow().len(), 1); // call borrow on the RefCell<Vec<String>> to get an immutable reference to the vector
    }
}
```

###### 484. How `RefCell<T>` keeping Track of Borrows at Runtime?

When creating immutable and mutable references, we use the & and &mut syntax, respectively. With `RefCell<T>`, we use the borrow and borrow_mut methods, which are part of the safe API that belongs to `RefCell<T>`. The borrow method returns the smart pointer type `Ref<T>`, and borrow_mut returns the smart pointer type `RefMut<T>`. Both types implement Deref, so we can treat them like regular references.

The `RefCell<T>` keeps track of how many `Ref<T>` and `RefMut<T>` smart pointers are currently active. Every time we call borrow, the `RefCell<T>` increases its count of how many immutable borrows are active. When a `Ref<T>` value goes out of scope, the count of immutable borrows goes down by one. Just like the compile-time borrowing rules, `RefCell<T>` lets us have many immutable borrows or one mutable borrow at any point in time.

If we try to violate these rules, rather than getting a compiler error as we would with references, the implementation of RefCell<T> will panic at runtime.

```rust
// Filename: src/lib.rs
// This code panics!
    impl Messenger for MockMessenger {
        fn send(&self, message: &str) {
            let mut one_borrow = self.sent_messages.borrow_mut();
            let mut two_borrow = self.sent_messages.borrow_mut(); // we create two mutable borrow, this makes two mutable references in the same scope, which isn’t allowed.  The code will compile without any errors, but in runtime will panicked already borrowed: BorrowMutError

            one_borrow.push(String::from(message));
            two_borrow.push(String::from(message));
        }
    }
```

###### 485. How get a value that can have multiple owners and that we can mutate?

`Rc<T>` lets you have multiple owners of some data, but it only gives immutable access to that data. If you have an `Rc<T>` that holds a `RefCell<T>`, you can get a value that can have multiple owners and that you can mutate.

```rust
// Filename: src/main.rs

#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));

    let b = Cons(Rc::new(RefCell::new(3)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(4)), Rc::clone(&a));

    *value.borrow_mut() += 10;

    println!("a after = {a:?}");
    println!("b after = {b:?}");
    println!("c after = {c:?}");
}
```

###### 486. what is the thread-safe version of `RefCell<T>`?

`RefCell<T>` does not work for multithreaded code! `Mutex<T>` is the thread-safe version of `RefCell<T>`

#### 15.6 Reference Cycles Can Leak Memory

###### 487. What is `memory leak`?

This is a situation in which a memory is created that is never cleaned up.

###### 488. What situation in Rust does create 'memory leak'?

Rust allows memory leaks by using `Rc<T>` and `RefCell<T>`. Calling `Rc::clone` increases the `strong_count` of an `Rc<T>` instance, and an `Rc<T>` instance is only cleaned up if its `strong_count` is 0. It’s possible to create references where instance refer to each other in a cycle.  This creates memory leaks because the `strong_count` of each instance in the cycle will never reach 0, and the values will never be dropped.

```rust
// Filename: src/main.rs

use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>),
    Nil,
}

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}

fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        *link.borrow_mut() = Rc::clone(&b);
    }
    // The reference count of the Rc<List> instances in both a and b are 2
    println!("b rc count after changing a = {}", Rc::strong_count(&b));
    println!("a rc count after changing a = {}", Rc::strong_count(&a));

    // Uncomment the next line to see that we have a cycle;
    // it will overflow the stack
    // println!("a next item = {:?}", a.tail());

    //  At the end of main, Rust drops the variable b, which decreases the reference count of the b Rc<List> instance from 2 to 1. The memory that Rc<List> has on the heap won’t be dropped at this point, because its reference count is 1, not 0. Then Rust drops a, which decreases the reference count of the a Rc<List> instance from 2 to 1 as well. This instance’s memory can’t be dropped either, because the other Rc<List> instance still refers to it. The memory allocated to the list will remain uncollected forever.
}
```

###### 489. How can we avoid memory leaks by using `Rc<T>` and `RefCell<T>`?

If you have `RefCell<T>` values that contain `Rc<T>` values or similar nested combinations of types with interior mutability and reference counting, you must ensure that you don’t create cycles; you can’t rely on Rust to catch them. Creating a reference cycle would be a logic bug in your program that you should use automated tests, code reviews, and other software development practices to minimize.
Another solution for avoiding reference cycles is reorganizing your data structures so that some references express ownership and some references don’t. As a result, you can have cycles made up of some ownership relationships and some non-ownership relationships, and only the ownership relationships affect whether or not a value can be dropped.

###### 490. How we can organize our data structures that have reference cycles so avoid memory leaks?

Memory leaks with reference cycles occur when cycles are created by Strong references, that is, references that have ownership of the data they reference.

Calling `Rc::clone` increases the `strong_count` of an `Rc<T>` instance, and an `Rc<T>` instance is only cleaned up if its strong_count is 0. You can also create a Weak reference to the value within an `Rc<T>` instance by calling `Rc::downgrade` and passing a reference to the `Rc<T>`. Strong references are how you can share ownership of an `Rc<T>` instance. Weak references don’t express an ownership relationship, and their count doesn’t affect when an `Rc<T>` instance is cleaned up. They won’t cause a reference cycle because any cycle involving some weak references will be broken once the strong reference count of values involved is 0.

```rust
// Filename: src/main.rs


use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}
```

###### 491. How we can access a value that a `Weak<T>` is pointing to?

Because the value that `Weak<T>` references might have been dropped, to do anything with the value that a `Weak<T>` is pointing to, you must make sure the value still exists. Do this by calling the `upgrade` method on a `Weak<T>` instance, which will return an `Option<Rc<T>>`. You’ll get a result of Some if the `Rc<T>` value has not been dropped yet and a result of None if the `Rc<T>` value has been dropped. Because upgrade returns an `Option<Rc<T>>`, Rust will ensure that the Some case and the None case are handled, and there won’t be an invalid pointer.

###### 492. Where get more information about to implement your own smart pointers?

 check out “[The Rustonomicon](https://doc.rust-lang.org/nomicon/index.html)” for more useful information.


### 16 Fearless Concurrency

###### 493. What is Concurrent programming?

Parallel programming is when different parts of a program are executed independently,

###### 494. What is Parallel programming?

Parallel programming is when different parts of a program are executed simultaneously

#### 16.1 Using Threads to Run Code Simultaneously

###### 495. What is threads?

In most current operating systems, an executed program’s code is run in a process, and the operating system will manage multiple processes at once. Within a program, you can also have independent parts that run simultaneously. The features that run these independent parts are called threads

###### 496. What are the benefits of using multiple threads?

Splitting the computation in your program into multiple threads to run multiple tasks at the same time can improve performance.

###### 497. What are the problems of using multiple threads?

- this adds complexity
- because threads can run simultaneously, there’s no inherent guarantee about the order in which parts of your code on different threads will run
- Race conditions, where threads are accessing data or resources in an inconsistent order
- Deadlocks, where two threads are waiting for each other, preventing both threads from continuing
- Bugs that happen only in certain situations and are hard to reproduce and fix reliably

###### 498. What is Race conditions?

Situation where threads are accessing the same data or resources in an inconsistent order

###### 499. What is Deadlocks?

Situation where two threads are waiting for each other, preventing both threads from continuing

###### 500. What create a new thread?

To create a new thread, we call the `thread::spawn` function and pass it a closure containing the code we want to run in the new thread.

```rust
Filename: src/main.rs
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }
}
```

###### 501. What happen whit spawned threads when main thread  completes?

When main thread of a Rust program completes, all spawned threads are shut down, whether or not they have finished running

###### 502. How can we guarantee that a spawned thread will completely finish its execution?

We should save the return value of `thread::spawn` in a variable. The return type of `thread::spawn` is JoinHandle. A JoinHandle is an owned value that, when we call the join method on it, will wait for its thread to finish. Calling `join` on the handle blocks the thread currently running until the thread represented by the handle terminates.

```rust
// Filename: src/main.rs
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    // handle.join().unwrap(); main thread will wait for the spawned thread to finish and then run its for loop, 

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}
```

###### 503. What mean Blocking a thread?

Blocking a thread means that thread is prevented from performing work or exiting

###### 504. How stop current thread execution for a short duration?

We need to call the `thread::sleep` function passing it the Duration

###### 505. How we should use any data from the main thread in the spawned thread’s code?

If we do use any data from the main thread in the spawned thread’s code we must point `move` keyword before a closure that run spawned thread 

```rust
// use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {v:?}");
    });

    handle.join().unwrap();
}
```

#### 16.2 Using Message Passing to Transfer Data Between Threads

###### 506. What is `Message Passing` concurrency?

This is approach to ensuring safe concurrency where threads or actors communicate by sending each other messages containing data

###### 507. How `Message Passing` implemented in Rust?

To accomplish message-passing concurrency, Rust’s standard library provides an implementation of channels. A channel is a general programming concept by which data is sent from one thread to another.

###### 508. What is 'Channels'?

A channel is a general programming concept by which data is sent from one thread to another. By means Channels Rust accomplish message-sending concurrency.
A channel has two halves: a transmitter and a receiver. One part of your code calls methods on the transmitter with the data you want to send, and another part checks the receiving end for arriving messages. A channel is said to be closed if either the transmitter or receiver half is dropped.

###### 509. How create Chanel for multiple producer and single consumer (mpsc)?

We must call `std::sync::mpsc::channel()` function. The `mpsc::channel` function returns a tuple, the first element of which is the sending end—the transmitter—and the second element is the receiving end—the receiver

```rust
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
}
```

###### 510. How can we organize thread communication using mpsc Channel?

- By means `mpsc::channel()` function we should create sending end—the transmitter—and the receiving end—the receiver.
- Using `thread::spawn` we create a new thread and then using `move` to move transmitter into the closure so the spawned thread owns transmitter. The spawned thread needs to own the transmitter to be able to send messages through the channel. The transmitter has a `send` method that takes the value we want to send. The send method returns a `Result<T, E>` type, so if the receiver has already been dropped and there’s nowhere to send a value, the send operation will return an error.
- in the main thread we’ll get the value from the receiver. The receiver has two useful methods: `recv` and `try_recv`. We’re using recv, short for receive, which will block the main thread’s execution and wait until a value is sent down the channel. Once a value is sent, recv will return it in a `Result<T, E>`. When the transmitter closes, recv will return an error to signal that no more values will be coming.
The `try_recv` method doesn’t block, but will instead return a `Result<T, E>` immediately: an Ok value holding a message if one is available and an Err value if there aren’t any messages this time. Using `try_recv` is useful if this thread has other work to do while waiting for messages: we could write a loop that calls `try_recv` every so often, handles a message if one is available, and otherwise does other work for a little while until checking again.

```rust
// Filename: src/main.rs
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {received}");
}
```

###### 511. In Channel, is it possible to reuse a value in the sender code after it has been sent?

The sending end `send` method of mpsc Cannel takes ownership of its parameter, and when the value is moved, the receiver takes ownership of it. This stops us from accidentally using the value again after sending it; the ownership system checks that everything is okay.

###### 512. How we can send multiple values in mpsc Channel?

The spawned thread has a vector of strings that we want to send to the main thread by means sending end `send` method of mpsc Cannel. We iterate over them, sending each individually.
In the main thread, we’re not calling the recv function explicitly anymore: instead, we’re treating receiving end of mpsc Cannel as an iterator. For each value received, we can perform some operations. When the channel is closed, iteration will end.

```rust
// Filename: src/main.rs

use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {received}");
    }
}
```

###### 513. How we can use multiply produsers whit mpsc Cannel?

- By means `mpsc::channel()` function we should create sending end—the transmitter—and the receiving end—the receiver.
- Using `thread::spawn` we must create some new threads
- Then using `clone()` method of transmitter we make transmitter clones and `move` them into the closures of the spawned threds.
- Then using the transmitters `send` method we can send data to the receiving end of Cannel.
- in the main thread by using `recv` or `try_recv` method of receiver we can get values passed by spawned threds.

```rust
Filename: src/main.rs
    // --snip--

    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone();
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx1.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    thread::spawn(move || {
        let vals = vec![
            String::from("more"),
            String::from("messages"),
            String::from("for"),
            String::from("you"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {received}");
    }

    // --snip--
```

#### 16.3 Shared-State Concurrency

###### 514. What is Mutex?

Mutex is an abbreviation for mutual exclusion, as in, a mutex allows only one thread to access some data at any given time.
Mutex is described as guarding the data it holds via the locking system.

###### 515. How create Mutex?

We create a `Mutex<T>`  by calling the associated function `new` which we passing shared data

```rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }

    println!("m = {m:?}");
}
```

###### 516. How Sharing a `Mutex<T>` Between Multiple Threads?

- We must wrap Mutex value inside `Arc<T>` type.
- Then we should clone Arc value and used cloned value inside thread code to access data inside a Mutex.

###### 517. How does a thread access data inside a Mutex?

- To access the data inside the mutex, we use the `lock` method to acquire the lock.
- If the mutex is locked by another thread, this call will block the current thread so that it cannot do any work until it is its turn to acquire the lock.
- The call to `lock` returns a smart pointer called `MutexGuard`, wrapped in a `LockResult` that we can handled with the call to unwrap. We can treat the value as a mutable reference to the data inside.
- The call to lock would fail if another thread holding the lock panicked. In that case, no one would ever be able to get the lock.
- `Mutex<T>` is a smart pointer with a Drop implementation releases the lock automatically when a MutexGuard goes out of scope, which happens at the end of the inner scope.
- `let`, any temporary values used in the expression on the right hand side of the equals sign are immediately dropped when the let statement ends. However, `while let` (and `if let` and `match`) does not drop temporary values until the end of the associated block.

```rust
impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            while let Ok(job) = receiver.lock().unwrap().recv() { // receiver.lock() return  LockResult<MutexGuard<T>>
                println!("Worker {id} got a job; executing.");

                job();
            } // MutexGuard<T> will be dropped here
        });

        Worker { id, thread }
    }
}
impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || loop {
            let job = receiver.lock().unwrap().recv().unwrap(); // receiver.lock() return  LockResult<MutexGuard<T>>,  MutexGuard<T> will be dropped here when the let statement ends. 
            
            println!("Worker {} got a job; executing.", id);
            
            job();
        });

        Worker {id, thread}
    }
}


```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

###### 518. What is `Arc<T>`?

`Arc<T>` is *atomically reference counted* type is using to enable multiple ownership value that it wrap. Unlike `Rc<T>`, `Arc<T>` used in multithreaded context.

###### 519. What is Atomics?

Atomics are an additional kind of concurrency primitive that work like primitive types but are safe to share across threads.

documentation for [std::sync::atomic](https://doc.rust-lang.org/std/sync/atomic/index.html) for more details.

###### 520. Way having immutable `Mutex<T>`  value we could get a mutable reference to the value inside it?

This is because `Mutex<T>` provides interior mutability, as the `Cell` family does. In the same way we using `RefCell<T>`

###### 521. What is deadlock?

These occur when an operation needs to lock two resources and two threads have each acquired one of the locks, causing them to wait for each other forever.

#### 16.4 Extensible Concurrency with the Sync and Send Traits.

###### 522. For what used The Send marker trait?

The Send marker trait indicates that ownership of values of the type implementing Send can be transferred between threads.

###### 523. Are `Rc<T>` is `Send`?

`Rc<T>` cannot be Send because if you cloned an `Rc<T>` value and tried to transfer ownership of the clone to another thread, both threads might update the reference count at the same time. For this reason, `Rc<T>` is implemented for use in single-threaded situations where you don’t want to pay the thread-safe performance penalty.

###### 524. Does we marked as Send Any type composed entirely of Send types?

Any type composed entirely of Send types is automatically marked as Send as well.

###### 525. What primitive types are Send?

Almost all primitive types are Send, aside from raw pointers

###### 526. For what used The Sync marker trait?

The Sync marker trait indicates that it is safe for the type implementing Sync to be referenced from multiple threads. In other words, any type T is Sync if &T (an immutable reference to T) is Send, meaning the reference can be sent safely to another thread.

###### 527. Does we marked as Sync Any type composed entirely of Sync types?

Any type composed entirely of Sync types is automatically marked as Sync as well.

###### 528. What primitive types are Sync?

All primitive types are Sync

###### 529. How we can manually implement Send and Sync type?

Manually implementing these traits involves implementing unsafe Rust code and so requires careful thought to uphold the safety guarantees.

### 17 Fundamentals of Asynchronous Programming: Async, Await, Futures, and Streams

**READ THIS [Async Rust in Three Parts](https://jacko.io/async_intro.html)**

###### 530. What techniques are for working on more than one operation at a time?

Modern computers offer two techniques for working on more than one operation at a time: parallelism and concurrency.

###### 531. What is CPU-bound or compute-bound operation?

CPU-bound operation is operation that limited by the computer’s potential data processing speed within the CPU or GPU, and how much of that speed it can dedicate to the operation.

###### 532. What is IO-bound operation?

Operation limited by the speed of the computer’s input and output?

###### 533. What is concurrency?

When an individual works on several different tasks before any of them is complete, this is concurrency. Maybe you have two different projects checked out on your computer, and when you get bored or stuck on one project, you switch to the other. You’re just one person, so you can’t make progress on both tasks at the exact same time, but you can multi-task, making progress on one at a time by switching between them.

###### 534. What is parallelism?

When the team splits up a group of tasks by having each member take one task and work on it alone, this is parallelism. Each person on the team can make progress at the exact same time

###### 535. What is serial?

one of your own tasks depends on another of your tasks

#### 17.1 Futures and the Async Syntax

###### 536. What is key elements of asynchronous programming in Rust?

The key elements of asynchronous programming in Rust are Future trait and Rust’s `async` and `await` keywords.

###### 537. What is Future in Rust asynchronous programming?

- Rust provides a Future trait as a building block so that different async operations can be implemented with different data structures but with a common interface.
- A Future trait represent concept of future that is a value that may not be ready now but will become ready at some point in the future.
- In Rust, futures are types that implement the Future trait.
- Each future holds its own information about the progress that has been made and what “ready” means.

###### 538. How to use `async` keyword?

You can apply the async keyword to blocks and functions to specify that they can be interrupted and resumed.

###### 539. In what places of code async function or block can be paused and resumed.

Any point where you await a future within an async block or function is a potential spot for that async block or function to pause and resume.

###### 540. What called process of checking with a Future to see if its value is available yet?

The process of checking with a future to see if its value is available yet is called *polling*.

###### 541. How to use `await` keyword?

We must use `await` keyword only within an async block or async function.  We point `await` keyword  through the dot after call of async function to await a future (that is, wait for it to become ready).

###### 542. What is `trpl` crate?

- `trpl` is short for “The Rust Programming Language”
- `trpl` was created to teach Rust async
- It re-exports all the types, traits, and functions you’ll need, primarily from the [futures](https://crates.io/crates/futures) and [tokio](https://tokio.rs/) crates.
- if you want to understand what the crate does, we encourage you to check out [its source code](https://github.com/rust-lang/book/tree/main/packages/trpl)

###### 543. What is `futures` crate?

The futures crate is an official home for Rust experimentation for async code, and it’s actually where the Future trait was originally designed.

###### 544. What is Tokio in Rust ?

Tokio is the most widely used async runtime in Rust today, especially for web applications.

###### 545. How to define `async` function?

We define function and mark it with `async` keyword before function definition. Inside this function we can used calls of other async function whit `await` keyword.

```rust
// use trpl::Html;

async fn page_title(url: &str) -> Option<String> {
    // let resp: impl Future<Output = Response> = trpl::get(url);
    let response: Response = trpl::get(url).await; // fetch whatever URL is passed in and add the await keyword to await the response
    let response_text: String = response.text().await; // get the text of the response, we call its text method, and once again await it with the await keyword.
    //  Both of these steps are asynchronous. For the get function, we have to wait for the server to send back the first part of its response, which will include HTTP headers, cookies, and so on, and can be delivered separately from the response body. Especially if the body is very large, it can take some time for it all to arrive. Because we have to wait for the entirety of the response to arrive, the text method is also async.
    // we can do that: let response_text = trpl::get(url).await.text().await;
    Html::parse(&response_text)
        .select_first("title")
        .map(|title_element| title_element.inner_html())
    // Once we have response_text, we can parse it into an instance of the Html type using Html::parse. Instead of a raw string, we now have a data type we can use to work with the HTML as a richer data structure. In particular, we can use the select_first method to find the first instance of a given CSS selector. By passing the string "title", we’ll get the first <title> element in the document, if there is one. Because there may not be any matching element, select_first returns an Option<ElementRef>. Finally, we use the Option::map method, which lets us work with the item in the Option if it’s present, and do nothing if it isn’t. (We could also use a match expression here, but map is more idiomatic.) In the body of the function we supply to map, we call inner_html on the title_element to get its content, which is a String. When all is said and done, we have an Option<String>.
}
```

###### 546. How Rust compile async function?

- When Rust sees a function marked with `async`, it compiles it into a non-async function with body that return an `async` block whit code of that async function.
- This `async` block Rust compile to a unique, anonymous data type that implements the Future trait.
- So the return type of compiled function is the type of the anonymous data type the compiler creates for that async block, that is, impl Future whit associated Output type corresponding to return type of the original async function.

```rust
use std::future::Future;
use trpl::Html;

fn page_title(url: &str) -> impl Future<Output = Option<String>> + '_ { // '_. Because the function returns a future that refers to a reference—in this case, the reference from the url parameter—we need to tell Rust that we want that reference to be included. We don’t have to name the lifetime here, because Rust is smart enough to know there’s only one reference that could be involved, but we do have to be explicit that the resulting future is bound by that lifetime.
    async move { // 'move' because of how it uses the url parameter
        let text = trpl::get(url).await.text().await;
        Html::parse(&text)
            .select_first("title")
            .map(|title| title.inner_html())
    }
}
```

###### 547. What is required for run async code?

For running async code required Runtime. There are many different async runtimes available, each of which makes different tradeoffs suitable to the use case it targets. For example, a high-throughput web server with many CPU cores and a large amount of RAM has very different needs than a microcontroller with a single core, a small amount of RAM, and no heap allocation ability. The crates that provide those runtimes also often supply async versions of common functionality such as file or network I/O

```rust
fn main() {
    let args: Vec<String> = std::env::args().collect();

    trpl::run(async { // Behind the scenes, calling run sets up a runtime that’s used to run the future passed in. Once the future completes, run returns whatever value the future produced.
        let url = &args[1];
        match page_title(url).await {
            Some(title) => println!("The title for {url} was {title}"),
            None => println!("{url} had no title"),
        }
    })
}
```

###### 548. What is Async Runtime?

The runtime is an executor for a state machines that is automatically generated by the compiler based on the definition of asynchronous functions or blocks.
In each async function or block each `await` point in a place where control is handed back to the runtime. To make that work, Rust needs to keep track of the state involved in the `async` block so that the runtime can kick off some other work and then come back when it’s ready to try advancing the first one again.
Compiler creates a unique enum for each async block.


```rust
// Rust compiler creates and manages the state machine data structures for async code automatically like if you’d written an enum like this to save the current state at each await point:

enum PageTitleFuture<'a> {
    Initial { url: &'a str },
    GetAwaitPoint { url: &'a str },
    TextAwaitPoint { response: trpl::Response },
}
```

```rust
//  small working web scraper

use trpl::{Either, Html};

fn main() {
    let args: Vec<String> = std::env::args().collect();

    trpl::run(async {
        let title_fut_1 = page_title(&args[1]);
        let title_fut_2 = page_title(&args[2]);

        let (url, maybe_title) =
            match trpl::race(title_fut_1, title_fut_2).await { // Under the hood, race is built on a more general function, select, which you will encounter more often in real-world Rust code. A select function can do a lot of things that the trpl::race function can’t, but it also has some additional complexity that we can skip over for now.
            // enum Either<A, B> {
            //     Left(A),
            //     Right(B),
            // }
                Either::Left(left) => left,
                Either::Right(right) => right,
            };

        println!("{url} returned first");
        match maybe_title {
            Some(title) => println!("Its page title is: '{title}'"),
            None => println!("Its title could not be parsed."),
        }
    })
}

async fn page_title(url: &str) -> (&str, Option<String>) {
    let text = trpl::get(url).await.text().await;
    let title = Html::parse(&text)
        .select_first("title")
        .map(|title| title.inner_html());
    (url, title)
}
```

#### 17.2 Applying Concurrency with Async

###### 549. How create a New async Task with `trpl::spawn_task`?

```rust
// Filename: src/main.rs
use std::time::Duration;

fn main() {
    trpl::run(async { // start Runtime and pass it task_main
        let handle = trpl::spawn_task(async { // create, add, and run task_2 on Runtime
            for i in 1..10 { // loop in task_2
                println!("hi number {i} from the first task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        });

        for i in 1..5 { // loop in task_1
            println!("hi number {i} from the second task!");
            trpl::sleep(Duration::from_millis(500)).await;
        }

        handle.await.unwrap(); // if this is not specified task_2 well be shutdown when task_main ends.
    });
}
```

###### 550. How create and run multiple async task? 

```rust
// Filename: src/main.rs
fn main() {
    trpl::run(async { // run Runtime and run main_task
        let fut1 = async { // create task_1
            for i in 1..10 {
                println!("hi number {i} from the first task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        let fut2 = async { // create task_2
            for i in 1..5 {
                println!("hi number {i} from the second task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        trpl::join(fut1, fut2).await; // Joins the result of two futures, waiting for them both to complete. This function will return a new future which awaits both futures to complete. The returned future will finish with a tuple of both results.

    });
}
```

###### 551. How Passing Messages between Futures (async tasks)?

```rust
// Filename: src/main.rs
use std::time::Duration;

fn main() {
    trpl::run(async { // start Runtime and pass it main_task
    
        let (tx, mut rx) = trpl::channel(); // an async version of the multiple-producer, single-consumer channel API we used with threads.

        let tx1 = tx.clone();
        let tx1_fut = async move { // move keyword works with async blocks just as it does with closures.  We move tx1 into that async block, it would be dropped once that block ends

            let vals = vec![
                String::from("hi"),
                String::from("from"),
                String::from("the"),
                String::from("future"),
            ];

            for val in vals {
                tx1.send(val).unwrap(); // we don’t await the send call, because it doesn’t block. It doesn’t need to, because the channel we’re sending it into is unbounded.

                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        let rx_fut = async {

            // The loop will continue executing as long as the pattern it specifies continues to match the value.
            // trpl::Receiver::recv method call produces a future, which we await. The runtime will pause the future until it is ready. Once a message arrives, the future will resolve to Some(message) as many times as a message arrives. When the channel closes, regardless of whether any messages have arrived, the future will instead resolve to None to indicate that there are no more values and thus we should stop polling—that is, stop awaiting.

            while let Some(value) =  rx.recv().await { // When all owners of tx will be dropped rx.recv().await returns None and loop ends
                println!("received '{value}'");
            }
        };

        let tx_fut = async move { // move keyword works with async blocks just as it does with closures.  We move tx into that async block, it would be dropped once that block ends
            let vals = vec![
                String::from("more"),
                String::from("messages"),
                String::from("for"),
                String::from("you"),
            ];

            for val in vals {
                tx.send(val).unwrap();
                trpl::sleep(Duration::from_millis(1500)).await;
            }
        };

        trpl::join3(tx1_fut, tx_fut, rx_fut).await;
    });
}
```

###### 552. Can we use `for` loop over an asynchronous series of items?

We can not use `for` loop over an asynchronous series of items, instead we can use `while let` conditional loop.

###### 553. How we can iterate over asynchronous series of items?

We can use `while let` conditional loop. We can not use `for` loop.

###### 554. What is `while let` conditional loop?

This is the loop version of the `if let` construct. The loop will continue executing as long as the pattern it specifies continues to match the value.

```rust
        while let Some(value) = rx.recv().await {
            println!("received '{value}'");
        }
```

#### 17.3 Working with Any Number of Futures


###### 555. How we can run any number of async Task (Futures) the same type?

```rust
// Filename: src/main.rs

use std::time::Duration;
use std::future::Future;
use std::pin::Pin;

fn main() {
    trpl::run(async {
    
        let (tx, mut rx) = trpl::channel();
        let tx1 = tx.clone();
        let tx1_fut = async move {

            let vals = vec![
                String::from("hi"),
                String::from("from"),
                String::from("the"),
                String::from("future"),
            ];

            for val in vals {
                tx1.send(val).unwrap();

                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        let rx_fut = async {

            while let Some(value) =  rx.recv().await {
                println!("received '{value}'");
            }
        };

        let tx_fut = async move {
            let vals = vec![
                String::from("more"),
                String::from("messages"),
                String::from("for"),
                String::from("you"),
            ];

            for val in vals {
                tx.send(val).unwrap();
                trpl::sleep(Duration::from_millis(1500)).await;
            }
        };


        // The innermost type is the future itself. We note explicitly that the output of the future is the unit type () by writing Future<Output = ()>.
        // Then we annotate the trait with dyn to mark it as dynamic.
        // The entire trait reference is wrapped in a Pin<Box<T>>.
        
        // Finally, we state explicitly that futures is a Vec containing these items.
        let futures: Vec<Pin<Box<dyn Future<Output = ()>>>> = vec![Box::pin(tx1_fut), Box::pin(rx_fut), Box::pin(tx_fut)];

        //  For one thing, using Pin<Box<T>> adds a small amount of overhead from putting these futures on the heap with Box—and we’re only doing that to get the types to line up. We don’t actually need the heap allocation, after all: these futures are local to this particular function. As noted before, Pin is itself a wrapper type, so we can get the benefit of having a single type in the Vec—the original reason we reached for Box—without doing a heap allocation. We can use Pin directly with each future, using the std::pin::pin macro.

        // However, we must still be explicit about the type of the pinned reference; otherwise, Rust will still not know to interpret these as dynamic trait objects, which is what we need them to be in the Vec. We therefore pin! each future when we define it, and define futures as a Vec containing pinned mutable references to the dynamic future type, as in Listing 17-19.

        // Filename: src/main.rs
        // let tx1_fut = pin!(async move {
        //     // --snip--
        // });

        // let rx_fut = pin!(async {
        //     // --snip--
        // });

        // let tx_fut = pin!(async move {
        //     // --snip--
        // });

        // let futures: Vec<Pin<&mut dyn Future<Output = ()>>> =
        //     vec![tx1_fut, rx_fut, tx_fut];

        trpl::join_all(futures).await;
    });
}
```

###### 556. Can we run any number of async Task (Futures) different types?

This is a fundamental tradeoff: we can either deal with a dynamic number of futures with join_all, as long as they all have the same type, or we can deal with a set number of futures with the join functions or the join! macro, even if they have different types.


```rust
// Filename: src/main.rs

use std::{future::Future, pin::pin};

fn main() {
    trpl::run(async {
    
        let a = async { 1u32 };
        let b = async { "Hello!" };
        let c = async { true };

        let (a_result, b_result, c_result) = trpl::join!(a, b, c);
        println!("{a_result}, {b_result}, {c_result}");
    });
}
```

###### 557. How we can get only one future result from many futures?

We can use `trpl::race` to run two futures.

```rust
// use trpl::{Either, Html};
// use trpl::Duration;
use std::time::Duration;
use std::thread;

fn main() {
    let args: Vec<String> = std::env::args().collect();

    trpl::run(async {
        let slow = async {
            println!("'slow' started.");
            trpl::sleep(Duration::from_millis(100)).await;
            println!("'slow' finished.");
        };

        let fast = async {
            println!("'fast' started.");
            trpl::sleep(Duration::from_millis(50)).await;
            println!("'fast' finished.");
        };

        trpl::race(slow, fast).await;
    })
}
```

###### 558. In what order async runtime `race` run futures passed in as arguments?

Order depend on implementations of `race`. Some implementations always runs the futures passed in as arguments in the order in which they’re passed. Other implementations are fair and will randomly choose which future to poll first.


###### 559. How we can yield control from a long-running task to the Runtime?

We can use `trpl::sleep` calls with `await` points inside long-running code, but the best solution use `yield_now` function.

```rust
// use trpl::{Either, Html};
// use trpl::Duration;
use std::time::Duration;
use std::thread;

fn main() {

    trpl::run(async {
        let a = async {
            println!("'a' started.");
            slow("a", 30);
            // trpl::sleep(one_ms).await; sleep will always sleep for at least a millisecond
            trpl::yield_now().await;
            slow("a", 10);
            trpl::yield_now().await;
            slow("a", 20);
            trpl::yield_now().await;
            println!("'a' finished.");
        };

        let b = async {
            println!("'b' started.");
            slow("b", 75);
            trpl::yield_now().await;
            slow("b", 10);
            trpl::yield_now().await;
            slow("b", 15);
            trpl::yield_now().await;
            slow("b", 35);
            trpl::yield_now().await;
            println!("'b' finished.");
        };
    })
}

fn slow(name: &str, ms: u64) {
    thread::sleep(Duration::from_millis(ms));
    println!("'{name}' ran for {ms}ms");
}
```

#### 17.4 Streams: Futures in Sequence

###### 560. What is Streams in async Rust?

A stream is like an asynchronous form of iteration.

###### 561. How we can create Stream from Iterator?

We can use `trpl::stream_from_iter` function by passing it an iterator. Then we can using stream in `while let` loop whit `next().await`. We  need the StreamExt trait in scope to be able to use the next method. When we have StreamExt in scope, we can use all of its utility methods, just as with iterators, for example `filter` method.

```rust
use trpl::StreamExt;

fn main() {
    trpl::run(async {
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let iter = values.iter().map(|n| n * 2);
        let mut stream = trpl::stream_from_iter(iter);

        while let Some(value) = stream.next().await {
            println!("The value was: {value}");
        }
    });
}
```

```rust
use trpl::StreamExt;

fn main() {
    trpl::run(async {
        let values = 1..101;
        let iter = values.map(|n| n * 2);
        let stream = trpl::stream_from_iter(iter);

        let mut filtered =
            stream.filter(|value| value % 3 == 0 || value % 5 == 0);

        while let Some(value) = filtered.next().await {
            println!("The value was: {value}");
        }
    });
}
```

###### 562. How we can create stream of messages?

```rust
// Filename: src/main.rs
use trpl::{ReceiverStream, Stream, StreamExt};

fn main() {
    trpl::run(async {
        let mut messages =
            pin!(get_messages().timeout(Duration::from_millis(200)));

        while let Some(result) = messages.next().await {
            match result {
                Ok(message) => println!("{message}"),
                Err(reason) => eprintln!("Problem: {reason:?}"),
            }
        }
    })
}

fn get_messages() -> impl Stream<Item = String> {
    let (tx, rx) = trpl::channel();

    trpl::spawn_task(async move {
        let messages = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        for (index, message) in messages.into_iter().enumerate() {
            let time_to_sleep = if index % 2 == 0 { 100 } else { 300 };
            trpl::sleep(Duration::from_millis(time_to_sleep)).await;

            tx.send(format!("Message: '{message}'")).unwrap();
        }
    });

    ReceiverStream::new(rx)
}
```

###### 563. How we can merge streams?


```rust
// Filename: src/main.rs
use trpl::{ReceiverStream, Stream, StreamExt};

fn main() {
    trpl::run(async {
        let messages = get_messages().timeout(Duration::from_millis(200)); 
        let intervals = get_intervals()
            .map(|count| format!("Interval: {count}")) // we use the map helper method to transform the intervals into a string
            .throttle( // we use the throttle method on the intervals stream so that it doesn’t overwhelm the messages stream. Throttling is a way of limiting the rate at which a function will be called—or, in this case, how often the stream will be polled. Once every 100 milliseconds should do, because that’s roughly how often our messages arrive.
                Duration::from_millis(100) // Because we don’t actually want a timeout for intervals, though, we can just create a timeout which is longer than the other durations we are using. Here, we create a 10-second timeout with Duration::from_secs(10)
                )
            .timeout(Duration::from_secs(10)); 

        let merged = messages.merge(intervals)  // we merge the messages and intervals streams with the `merge` method which combines multiple streams into one stream that produces items from any of the source streams as soon as the items are available, without imposing any particular ordering
            .take(20); // To limit the number of items we will accept from a stream, we apply the take method

        let mut stream = pin!(merged); // we need to make stream mutable, so that the while let loop’s next calls can iterate through the stream, and pin it so that it’s safe to do so.
    })
}


fn get_messages() -> impl Stream<Item = String> {
    let (tx, rx) = trpl::channel();

    trpl::spawn_task(async move {
        let messages = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

        for (index, message) in messages.into_iter().enumerate() {
            let time_to_sleep = if index % 2 == 0 { 100 } else { 300 };
            trpl::sleep(Duration::from_millis(time_to_sleep)).await;

            if let Err(send_error) = tx.send(format!("Message: '{message}'")) {
                eprintln!("Cannot send message '{message}': {send_error}");
                break;
            }
        }
    });

    ReceiverStream::new(rx)
}

fn get_intervals() -> impl Stream<Item = u32> {
    let (tx, rx) = trpl::channel();

    trpl::spawn_task(async move {
        let mut count = 0;
        loop {
            trpl::sleep(Duration::from_millis(1)).await;
            count += 1;

            if let Err(send_error) = tx.send(count) {
                eprintln!("Could not send interval {count}: {send_error}");
                break;
            };
        }
    });

    ReceiverStream::new(rx)
}
```

#### 17.5 A Closer Look at the Traits for Async

###### 564. how Rust defines Future Trait?

```rust
use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```

###### 565. How named Future’s associated type?

Output

###### 566. What says Future’s associated type?

Future’s associated type Output says what the future resolves to.

###### 567. What method define Future Trait?

Future trait define `poll` method.

###### 568. Which takes and return the `poll` method of Future Trait?

`poll` method takes a special `Pin` reference for its `self` parameter and a mutable reference to a `Context` type, and returns `Poll<Self::Output>` type.

###### 569. how Rust defines Poll type?

Rust define the Poll type as enum whit one variant that has a value, Ready(T), and one which does not, Pending. The Pending variant indicates that the future still has work to do, so the caller will need to check again later. The Ready variant indicates that the future has finished its work and the T value is available.

```rust
enum Poll<T> {
    Ready(T),
    Pending,
}
```

###### 570. What happen if caller call `pull` again after the future has returned Ready?

Many futures will panic if polled again after becoming ready.

###### 571. How Rust compile code that uses `await`?

 Rust compiles it under the hood to code that calls `poll` method

```rust
Filename: src/main.rs
fn main() {
    let args: Vec<String> = std::env::args().collect();

    trpl::run(async {
        let url = &args[1];
        // match page_title(url).await {
        //     Some(title) => println!("The title for {url} was {title}"),
        //     None => println!("{url} had no title"),
        // }
        match page_title(url).poll() {
            Ready(page_title) => match page_title {
                Some(title) => println!("The title for {url} was {title}"),
                None => println!("{url} had no title"),
            }
            Pending => {
                // continue
            }
    })
}
```

###### 572. What should Rust do when the future is still Pending?

Rust will call `pull` in loop again, and again, and again, until the future is finally ready. Rust makes sure that the loop can hand off control to Async Runtime that can pause work on this future to work on other futures and then check this one again later.

###### 573. What is self-referential data types?

self-referential data types is types which objects hold reference on himself

###### 574. Way self-referential data types is unsafe?

 If we move the self-referential structure to other location in memory, those internal self-references will be left pointing to the old location, that is become invalid.

###### 575. What is Unpin and !Unpin Traits?

Unpin Trait are a marker trait which informs the compiler that a given type does not need to uphold any guarantees about whether the value in question can be safely moved in memory. Compiler implements Unpin automatically for all types where it can prove it is safe. A special case is where Unpin is not implemented for a type. The notation for this is `impl !Unpin for SomeType`, where `SomeType` is the name of a type that does need to uphold those guarantees to be safe whenever a pointer to that type is used in a Pin. 
In other words, there are two things to keep in mind about the relationship between Pin and Unpin. First, Unpin is the “normal” case, and !Unpin is the special case. Second, whether a type implements Unpin or !Unpin only matters when you’re using a pinned pointer to that type like Pin<&mut SomeType>.

###### 576. What is Pin type?

`Pin` is a wrapper for pointer-like types such as `&`, `&mut`, `Box`, and `Rc`. `Pin` is not a pointer itself and doesn’t have any behavior of its own like `R`c and `Arc` do with reference counting; it’s purely a tool the compiler use to enforce that data referenced by wrapped pointer can not be moved in memory. Type of this data must be marked by !Unpin trait. If Type of this data must be marked by !Unpin trait

###### 577. What does it affect Pin type?

If Pin type wraps pointer-like type such as `&`, `&mut`, `Box`, and `Rc`, that refers to a value of type marked with `!Unpin trait` the compiler enforce that data referenced by the wrapped pointer can not be moved in memory. If data type marked by Unpin trait - Pin type not affect.

###### 578. Why we must wraps to Pin type a pointer-like types of Future for using it?

Rust compiles an asynchronous function into a state machine structure that implements Future. This structure can contain a reference to itself, i.e. it is a self-referencing type. Since self-referencing types are unsafe, since when moving their objects in memory the reference will become invalid - the object must be passed for use wrapped in Box and Pin, which provides protection against moving in memory.

###### 579. Should we `pin` directly awaiting future?

Directly awaiting a `future` with await pins the `future` implicitly. That’s why we don’t need to use pin! everywhere we want to await futures.

###### 580. What is Stream trait?

 Stream trait merge together Iterator idea of a sequence: `its` next method provides an `Option<Self::Item>` and Future idea of readiness over time: its poll method provides a `Poll<Self::Output>`. To represent a sequence of items that become ready over time, we define a Stream trait that puts those features together:

 ```rust
use std::pin::Pin;
use std::task::{Context, Poll};

trait Stream {
    type Item;

    fn poll_next(
        self: Pin<&mut Self>,
        cx: &mut Context<'_>
    ) -> Poll<Option<Self::Item>>;
}
```

###### 581. How named Stream’s associated type?

The Stream trait defines an associated type called Item for the type of the items produced by the stream.

###### 582. Which method define Stream?

`poll_next`, name of the method it clear that it polls in the same way `Future::poll` does and produces a sequence of items in the same way `Iterator::next` does. 

###### 583. What type return `poll_next` method of Stream? 

`Poll<Option<Self::Item>>`. Its return type combines `Poll` with `Option`. The outer type is `Poll`, because it has to be checked for readiness, just as a future does. The inner type is `Option`, because it needs to signal whether there are more messages, just as an iterator does.


###### 584. What is StreamExt trait?

- StreamExt trait is wrapper for Stream which utils  `poll_next` method of Stream
- StreamExt trait allow working whit Stream on async mode using `await`
- StreamExt is automatically implemented for every type that implements Stream
- The StreamExt trait is also the home of all the interesting methods available to use with streams

```rust
trait StreamExt: Stream {
    async fn next(&mut self) -> Option<Self::Item>
    where
        Self: Unpin;

    // other methods...
}
```

#### 17.6  Putting It All Together: Futures, Tasks, and Threads

###### 585. what rules should be followed when choosing between Async model and Treads?

- If the work is very parallelizable, such as processing a bunch of data where each part can be processed separately, threads are a better choice.
- If the work is very concurrent, such as handling messages from a bunch of different sources that may come in at different intervals or different rates, async is a better choice.
- if you need both parallelism and concurrency, you  can use them together freely,

```rust
use std::{thread, time::Duration};

fn main() {
    let (tx, mut rx) = trpl::channel();

    thread::spawn(move || {
        for i in 1..11 {
            tx.send(i).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    trpl::run(async {
        while let Some(message) = rx.recv().await {
            println!("{message}");
        }
    });
}
```

### 18 Object-Oriented Programming Features of Rust

#### 18.1 Characteristics of Object-Oriented Languages

###### 586. Which Characteristics of Object-Oriented Languages?

OOP languages share certain common characteristics, namely:

- objects, 
- encapsulation, 
- inheritance.
- polymorphism

###### 587. What is objects in OOP?

An object packages both data and the procedures that operate on that data. The procedures are typically called methods or operations.

###### 588. How Rust implement OOP objects?

Rust implement objects by structs and enums that has data and impl blocks that provides methods on structs and enums.

###### 589. What is encapsulation?

- encapsulation means that the implementation details of an object aren’t accessible to code using that object. Therefore, the only way to interact with an object is through its public API; 
- code using the object shouldn’t be able to reach into the object’s internals and change data or behavior directly. This enables the programmer to change and refactor an object’s internals without needing to change the code that uses the object.

###### 590. How Rust implements encapsulation?

Rust implements encapsulation by the `pub` keyword that define which modules, types, functions, and methods in our code are public, and by default everything else is private.

```rust
// Filename: src/lib.rs

pub struct AveragedCollection { // struct is marked pub so that other code can use it, the list and average fields private so there is no way for external code to add or remove items to or from the list field directly
    list: Vec<i32>,
    average: f64,
}

```

```rust
// Filename: src/lib.rs

impl AveragedCollection { // The public methods add, remove, and average are the only ways to access or modify data in an instance of AveragedCollection
    pub fn add(&mut self, value: i32) {
        self.list.push(value);
        self.update_average();
    }

    pub fn remove(&mut self) -> Option<i32> {
        let result = self.list.pop();
        match result {
            Some(value) => {
                self.update_average();
                Some(value)
            }
            None => None,
        }
    }

    pub fn average(&self) -> f64 {
        self.average
    }

    fn update_average(&mut self) { // private method not available for external code 
        let total: i32 = self.list.iter().sum();
        self.average = total as f64 / self.list.len() as f64;
    }
}
```

###### 591. What is inheritance?

Inheritance is a mechanism whereby an object can inherit elements from another object’s definition, thus gaining the parent object’s data and behavior without you having to define them again.

###### 592. How Rust implements inheritance?

Rust do not implements inheritance. There is no way to define a struct that inherits the parent struct’s fields and method implementations without using a macro.

###### 593. How we can implement code reusing in Rust?

You can do this in a limited way in Rust code using default trait method implementations. This is similar to a parent class having an implementation of a method and an inheriting child class also having the implementation of the method. We can also override the default implementation of default method when implement trait, which is similar to a child class overriding the implementation of a method inherited from a parent class.

###### 594. What is Polymorphism?

Polymorphism is general concept that refers to code that can work with data of multiple types, which is being implemented, among other things by inheritance.

###### 595. How Rust implements Polymorphism?

Rust uses generics to abstract over different possible types and trait bounds to impose constraints on what those types must provide. This is sometimes called bounded parametric polymorphism.

#### 18.2 Using Trait Objects That Allow for Values of Different Types

###### 596. How create vector that store different types?

We need to define an Enum and bind the variants to the types that we will store in the vector. Then we can store the Enum variants in the vector with the value of the types that are bound to these variants.

###### 597. How implement common behavior (polymorphism) in Rust?

Common behavior in Rust can be implemented by trait object.

define a trait named Draw with one method named draw:

```rust
Filename: src/lib.rs
pub trait Draw {
    fn draw(&self);
}
```

defines a struct named Screen that holds a vector named components. This vector is of type Box<dyn Draw>, which is a trait object; it’s a stand-in for any type inside a Box that implements the Draw trait.

```rust
// Filename: src/lib.rs

pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
}
```

On the Screen struct, we’ll define a method named run that will call the draw method on each of its components

```rust
// Filename: src/lib.rs

impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

Implementing the Trait

```rust
// Filename: src/lib.rs

pub struct Button {
    pub width: u32,
    pub height: u32,
    pub label: String,
}

impl Draw for Button {
    fn draw(&self) {
        // code to actually draw a button
    }
}

use gui::Draw;

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

impl Draw for SelectBox {
    fn draw(&self) {
        // code to actually draw a select box
    }
}
```

Using trait objects to store values of different types that implement the same trait

```rust
// Filename: src/main.rs

use gui::{Button, Screen};

fn main() {
    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No"),
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}
```

###### 598. What is trait object?

We create a trait object by specifying some sort of pointer, such as a `&` reference or a `Box<T>` smart pointer, then the `dyn` keyword, and then specifying the relevant trait. A trait object points to both an instance of a type implementing our specified trait and a table used to look up trait methods on that type at runtime. We can use trait objects in place of a generic or concrete type. Wherever we use a trait object, Rust’s type system will ensure at compile time that any value used in that context will implement the trait object’s trait. Consequently, we don’t need to know all the possible types at compile time.
Specific purpose of trait object is to allow abstraction across common behavior. We can’t add data to a trait object

###### 599. what is the difference in usage trait objects in place of a generic or concrete type?

Wherever we use a trait object, Rust’s type system will ensure at compile time that any value used in that context will implement the trait object’s trait. Consequently, we don’t need to know all the possible types at compile time.

the compiler generates nongeneric implementations of functions and methods for each concrete type that we use in place of a generic type parameter. The code that results from monomorphization is doing static dispatch, which is when the compiler knows what method you’re calling at compile time. This is opposed to dynamic dispatch, which is when the compiler can’t tell at compile time which method you’re calling. In dynamic dispatch cases, the compiler emits code that at runtime will figure out which method to call.

When we use trait objects, Rust must use dynamic dispatch. The compiler doesn’t know all the types that might be used with the code that’s using trait objects, so it doesn’t know which method implemented on which type to call. Instead, at runtime, Rust uses the pointers inside the trait object to know which method to call. This lookup incurs a runtime cost that doesn’t occur with static dispatch. Dynamic dispatch also prevents the compiler from choosing to inline a method’s code, which in turn prevents some optimizations, and Rust has some rules about where you can and cannot use dynamic dispatch, called dyn compatibility. However, we did get extra flexibility in the code that we wrote in Listing 18-5 and were able to support in Listing 18-9, so it’s a trade-off to consider.

A generic type parameter can only be substituted with one concrete type at a time, whereas trait objects allow for multiple concrete types to fill in for the trait object at runtime. 

```rust
// Filename: src/lib.rs
pub struct Screen<T: Draw> {
    pub components: Vec<T>,
}

impl<T> Screen<T>
where
    T: Draw,
{
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

This restricts us to a Screen instance that has a list of components all of type Button or all of type TextField. If you’ll only ever have homogeneous collections, using generics and trait bounds is preferable because the definitions will be monomorphized at compile time to use the concrete types.

On the other hand, with the method using trait objects, one Screen instance can hold a `Vec<T>` that contains a `Box<Button>` as well as a `Box<TextField>`. Let’s look at how this works, and then we’ll talk about the runtime performance implications.

###### 600. What happen if we use values that don’t implement the traits that the trait objects need?

Rust won’t compile our code

#### 18.3 Implementing an Object-Oriented Design Pattern

###### 601. What is state pattern?

The state pattern is an object-oriented design pattern. The crux of the pattern is that we define a set of states a value can have internally and the value’s behavior changes based on its state.
The value that holds a state object knows nothing about the different behavior of the states or when to transition between states.

###### 602. What is advantage of using state pattern?

The advantage of using the state pattern is that, when the business requirements of the program change, we won’t need to change the code of the value holding the state or the code that uses the value. We’ll only need to update the code inside one of the state objects to change its rules or perhaps add more state objects.

```rust
// Filename: src/main.rs

use blog::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());

    post.request_review();
    assert_eq!("", post.content());

    post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}
```

```rust
// Filename: src/lib.rs

pub struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}

impl Post {
    pub fn new() -> Post {
        Post {
            state: Some(Box::new(Draft {})),
            content: String::new(),
        }
    }

    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }

    pub fn content(&self) -> &str {
        ""
    }

    pub fn request_review(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.request_review())
        }
    }

    pub fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve())
        }
    }

    pub fn content(&self) -> &str {
        self.state.as_ref().unwrap().content(self)
    }
}

trait State {
    fn request_review(self: Box<Self>) -> Box<dyn State>;
    fn approve(self: Box<Self>) -> Box<dyn State>;
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        ""
    }
}

struct Draft {}

impl State for Draft {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        Box::new(PendingReview {})
    }

    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
}

struct PendingReview {}

impl State for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn State> {
        Box::new(Published {})
    }
}

struct Published {}

impl State for Published {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn content<'a>(&self, post: &'a Post) -> &'a str {
        &post.content
    }
}
```

### 19 Patterns and Matching

###### 603. What is Patterns?

- Patterns are a special syntax in Rust for matching against the structure of types.
- To use a pattern, we compare it to some value to determine whether it has the correct shape of data to continue running a particular piece of code.
- Pattern can hav a named pieces, if compared value fits the shape of the pattern, we can use the named pieces in code associated with the pattern.

#### 19.1 All the Places Patterns Can Be Used

###### 604. Where are used Patterns?

- match Arms
- Conditional if let Expressions
- while let Conditional Loops
- for Loops
- let Statements
- Function Parameters

###### 605. How using Pattern in match Arms?

match expressions are defined as the keyword match, a value to match on, and one or more match arms that consist of a pattern and an expression to run if the value matches that arm’s pattern

```
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}
```

```rust
match x {
    None => None,
    Some(i) => Some(i + 1),
}
```

###### 606. what is the mandatory requirement when using match Arms?

One requirement for match expressions is that they need to be exhaustive in the sense that all possibilities for the value in the match expression must be accounted for.

###### 607. What method are for make exhaustive requirement for match expressions?

The  pattern `_` will match anything, so it’s often used in the last match arm for make exhaustive requirement.

###### 608. Which pattern can match anything?

The particular pattern `_` will match anything, but it never binds to a variable

###### 609. What pattern can be used for ignore  any value not specified?

The particular pattern `_` will match anything, but it never binds to a variable, so it can be useful when you want to ignore any value not specified.

###### 610. For what used `if let` Expressions?

`if let` expressions mainly as a shorter way to write the equivalent of a `match` that only matches one case. Optionally, `if let` can have a corresponding `else` containing code to run if the pattern in the `if let` doesn’t match. It’s also possible to mix and match `if let`, `else if`, and `else if let` expressions.

```rust
Filename: src/main.rs
fn main() {
    let favorite_color: Option<&str> = None;
    let is_tuesday = false;
    let age: Result<u8, _> = "34".parse();

    if let Some(color) = favorite_color {
        println!("Using your favorite color, {color}, as the background");
    } else if is_tuesday {
        println!("Tuesday is green day!");
    } else if let Ok(age) = age { // if let can also introduce new variables which shadow existing variables. new age variable that contains the value inside the Ok variant, shadowing the existing age variable. This means we need to place the if age > 30 condition within that block: we can’t combine these two conditions into if let Ok(age) = age && age > 30. The new age we want to compare to 30 isn’t valid until the new scope starts with the curly bracket.
        if age > 30 {
            println!("Using purple as the background color");
        } else {
            println!("Using orange as the background color");
        }
    } else { // The downside of using if let expressions is that the compiler doesn’t check for exhaustiveness. If we omitted the last else block and therefore missed handling some cases, the compiler would not alert us to the possible logic bug.
        println!("Using blue as the background color");
    }
}
```

###### 611. What are downside of using `if let` expressions?

The downside of using `if let` expressions is that the compiler doesn’t check for exhaustiveness, whereas with `match` expressions it does.

###### 612. For what used `while let` Conditional Loops?

`while let` conditional loop used for loop to run for as long as a pattern continues to match.

```rust
    let (tx, rx) = std::sync::mpsc::channel();
    std::thread::spawn(move || {
        for val in [1, 2, 3] {
            tx.send(val).unwrap();
        }
    });

    while let Ok(value) = rx.recv() {
        println!("{value}");
    }
```

###### 613. How to used a pattern in `for` Loops?

In a for loop, the value that directly follows the keyword `for` is a pattern. For example, in `for x in y` the x is the pattern.

```rust
    let v = vec!['a', 'b', 'c'];

    for (index, value) // pattern used to destructure
        in v.iter().enumerate() { // adapt an iterator using the enumerate method so it produces a value and the index for that value, placed into a tuple. 
    
        println!("{value} is at index {index}");
    }
```

###### 614. How used pattern whit `let` Statements whit binging value?

Every time we are using a let statement we are using patterns.

```
let PATTERN = EXPRESSION;
```

Whit a variable binding statements (for example let x = 5) left side is a pattern. Right side of this statement is expression that Rust calculates and compares value against the left part pattern and binds to any names it finds in left side. So in the let x = 5; example, x is a pattern that means “bind what matches here to the variable x.” That is in `let` Statements we can used more complicated patterns. For example, we can match value of tuple of three value against pattern of three value tuple type. Rust make destruction and binding values in tuple to variable names used in pattern. If the value does not match the pattern, it will result in a compilation error. To fix the error, we could ignore one or more of the values in the tuple using `_` or `..`.

```rust
    let (x, y, z) = (1, 2, 3);
    let (x, y) = (1, 2, 3); // error[E0308]: mismatched types
```

###### 615. How is used patterns whit Function parameters?

Part of function signature that corresponds to parameters list declaration is pattern that can be matched whit passed arguments. We can also use patterns in closure parameter lists in the same way as in function parameter lists

```rust
Filename: src/main.rs

fn print_coordinates(&(x, y): &(i32, i32)) {
    println!("Current location: ({x}, {y})");
}

fn main() {
    let point = (3, 5);
    print_coordinates(&point);
}
```

#### 19.2 Refutability: Whether a Pattern Might Fail to Match

###### 616. When patterns are irrefutable?

Patterns that will match for any possible value passed are irrefutable. An example would be x in the statement `let x = 5;` because x matches anything and therefore cannot fail to match.

###### 617. When patterns are refutable?

Patterns that can fail to match for some possible value are refutable.

###### 618. Which type of pattern can accept function parameters, `let` statements, and `for` loops?

Function parameters, let statements, and for loops can only accept irrefutable patterns, because the program cannot do anything meaningful when values don’t match. 

###### 619. Which type of pattern can accept `if let`, `while let` expressions and the `let-else` statement?

The `if let` and `while let` expressions and the `let-else` statement accept refutable and irrefutable patterns.

```rust
    let Some(x) = some_option_value; 
    
    //If some_option_value was a None value, it would fail to match the pattern Some(x), meaning the pattern is refutable. However, the let statement can only accept an irrefutable pattern because there is nothing valid the code can do with a None value. At compile time, Rust will complain that we’ve tried to use a refutable pattern where an irrefutable pattern is required:
```

###### 620. Why a compiler warns against irrefutable patterns in `if let`, `while let` expressions and the `let-else` statement?

compiler well warns because by definition `if let`, `while let` expressions and the `let-else` statement intended to handle possible failure: the functionality of a conditional is in its ability to perform differently depending on success or failure.

```rust
    if let x = 5 { // warning: irrefutable `if let` pattern
        println!("{x}");
    };
```

###### 621. How we can fix situation when we have a refutable pattern where an irrefutable pattern is needed?

If we have a refutable pattern where an irrefutable pattern is needed, we can fix it by changing the code that uses the pattern: instead of using `let`, we can use `if let`. Then if the pattern doesn’t match, the code will just skip the code in the curly brackets, giving it a way to continue validly.

```rust

    // let Some(x) = some_option_value; // note: `let` bindings require an "irrefutable pattern", like a `struct` or an `enum` with only one variant

    if let Some(x) = some_option_value {
        println!("{x}");
    }
```

#### 19.3 Pattern Syntax

###### 622. How we can directly maths patterns match patterns against literals?

We can use literals in pattern to match it directly whit value

```rust
    let x = 1;

    match x {
        1 => println!("one"),
        2 => println!("two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
```

###### 623. How we can use named variables in patterns to match values?

Named variables are irrefutable patterns that match any value. There is a complication when we use its in `match`, `if let`, or `while let` expressions, because each of these kinds of expression starts a new scope, variables declared as part of a pattern inside the expression will shadow those with the same name outside, as is the case with all variables.

```rust
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {y}"), // Some(y) pattern introduces a new variable named y inside of match scope that will match any value inside a Some value and shadows the y variable declared in outer scope.
        _ => println!("Default case, x = {x:?}"),
    }

    println!("at the end: x = {x:?}, y = {y}");
```

###### 624. How we can match multiple patterns inside one match arm?

We can match multiple patterns using the | syntax, which is the pattern or operator.

```rust
    let x = 1;

    match x {
        1 | 2 => println!("one or two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
```

###### 625. What is pattern 'or' operator?

Pattern or operator is used for matching multiple patterns and is denoted as `|`.

###### 626. How we can Matching Ranges of Values?

The `..=` syntax allows us to match to an inclusive range of values. Ranges are only allowed with numeric or char values.

```rust
    let x = 5;

    match x {
        1..=5 => println!("one through five"),
        _ => println!("something else"),
    }

    let x = 'c';

    match x {
        'a'..='j' => println!("early ASCII letter"),
        'k'..='z' => println!("late ASCII letter"),
        _ => println!("something else"),
    }
```

###### 627. How to destructure Struct?

```rust
// Filename: src/main.rs
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p; // code creates the variables a and b that match the values of the x and y fields of the p struct
    assert_eq!(0, a);
    assert_eq!(7, b);
}
```

```rust
// Filename: src/main.rs
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x, y } = p; // shorthand for patterns that match struct fields: only need to list the name of the struct field, and the variables created from the pattern will have the same names.
    assert_eq!(0, x);
    assert_eq!(7, y);
}
```

```rust
// Filename: src/main.rs
fn main() {
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {x}"), //destructure with literal values as part of the struct pattern. Doing so allows us to test some of the fields for particular values while creating variables to destructure the other fields.
        Point { x: 0, y } => println!("On the y axis at {y}"),
        Point { x, y } => {
            println!("On neither axis: ({x}, {y})");
        }
    }
}
```

###### 628. How to destructure Enum?

```rust
Filename: src/main.rs
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(0, 160, 255);

    match msg {
        Message::Quit => {
            // For enum variants without any data we can’t destructure the value any further. We can only match on the literal Message::Quit value, and no variables are in that pattern.
            println!("The Quit variant has no data to destructure.");
        }
        Message::Move { x, y } => {
            // For struct-like enum variants we can use a pattern similar to the pattern we specify to match structs. Here we use the shorthand form.
            println!("Move in the x direction {x} and in the y direction {y}");
        }
        Message::Write(text) => {
            println!("Text message: {text}");
        }
        Message::ChangeColor(r, g, b) => {
            // For tuple-like enum variants, like Message::Write that holds a tuple with one element and Message::ChangeColor that holds a tuple with three elements, the pattern is similar to the pattern we specify to match tuples. The number of variables in the pattern must match the number of elements in the variant we’re matching.
            println!("Change the color to red {r}, green {g}, and blue {b}");
        }
    }
}
```

###### 629. How to destructure Nested Structs and Enums?

```rust
enum Color {
    Rgb(i32, i32, i32),
    Hsv(i32, i32, i32),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!("Change color to red {r}, green {g}, and blue {b}");
        }
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!("Change color to hue {h}, saturation {s}, value {v}");
        }
        _ => (),
    }
}
```

###### 630. How to destructure mix of Structs and Tuples?

```rust
    let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });
```

##### Ignoring Values in a Pattern

###### 631. Why is it sometimes necessary to ignore values ​​in a pattern?

it’s sometimes useful to ignore values in a pattern, such as in the last arm of a match, to get a catchall that doesn’t actually do anything but does account for all remaining possible values.

###### 632. How to ignore entire value in a pattern?

We’ve used the underscore `_` as a wildcard pattern that will match any value but not bind to the value.

###### 633. In which cases we can ignoring entire value in a pattern?

This is especially useful as the last arm in a match expression, but we can also use it in any pattern, including function parameters,

###### 634. Why might we need to ignore a value in a function?

In most cases when you no longer need a particular function parameter, you would change the signature so it doesn’t include the unused parameter. Ignoring a function parameter can be especially useful in cases when, for example, you’re implementing a trait when you need a certain type signature but the function body in your implementation doesn’t need one of the parameters. You then avoid getting a compiler warning about unused function parameters, as you would if you used a name instead.

```rust
// Filename: src/main.rs
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {y}");
}

fn main() {
    foo(3, 4); // This code will completely ignore the value 3 passed as the first argument, and will print This code only uses the y parameter: 4.
}
```

###### 635. How to ignore part of a value in patterns?

We can use _ inside another pattern to ignore just part of a value. We can also use underscores in multiple places within one pattern to ignore particular values.

```rust
    let mut setting_value = Some(5);
    let new_setting_value = Some(10);

    match (setting_value, new_setting_value) {
        (Some(_), Some(_)) => { // we don’t need to match on or use the values inside either Some variant, but we do need to test for the case when setting_value and new_setting_value are the Some variant.
            println!("Can't overwrite an existing customized value");
        }
        _ => {
            setting_value = new_setting_value;
        }
    }

    println!("setting is {setting_value:?}");

```

```rust
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, _, third, _, fifth) => { // multiple _ inside one pattern
            println!("Some numbers: {first}, {third}, {fifth}")
        }
    }
```

###### 636. Why might we need to ignore a unused Variable?

If you create a variable but don’t use it anywhere, Rust will usually issue a warning because an unused variable could be a bug. However, sometimes it’s useful to be able to create a variable you won’t use yet, such as when you’re prototyping or just starting a project. In this situation, you can tell Rust not to warn you about the unused variable by starting the name of the variable with an underscore.

###### 637. How we can ignore a unused Variable?

starting the name of the variable with an underscore `_`.

```rust
Filename: src/main.rs
fn main() {
    let _x = 5;
    let y = 10;
}
```

###### 638. What difference between using underscore `_` and underscore whit variable name `_x`?

The syntax `_x` binds a matched value to the variable `_x`, whereas `_` doesn’t bind at all. So following using value that was moved to _x well cause compile error.

```rust
    let s = Some(String::from("Hello!"));

    if let Some(_s) = s { 
        println!("found a string");
    }

    println!("{s:?}"); // We’ll receive an error because the s value will still be moved into _s, which prevents us from using s again.
```

```rust
    let s = Some(String::from("Hello!"));

    if let Some(_) = s {
        println!("found a string");
    }

    println!("{s:?}"); //  will compile without any errors because s doesn’t get moved into _.
```

###### 639. How can we ignore Remaining Parts of a Value?

With values that have many parts, we can use the `..` syntax to use specific parts and ignore the rest, avoiding the need to list underscores for each ignored value. The `..` pattern ignores any parts of a value that we haven’t explicitly matched in the rest of the pattern. The syntax .. is expanded to as many values as it needs to be, so we can use it in any part of  named variables list of pattern. However, using .. must not be unambiguous.

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        // (.., last) => {
        // (first, ..) => {
        // (first, second, .., last) => {
        // (.., second, ..) => { // unambiguous error: `..` can only be used once per tuple pattern
        (first, .., last) => {
            println!("Some numbers: {first}, {last}");
        }
    }
}
```

##### Extra Conditionals with Match Guards

###### 640. What is *match guard*?

A match guard is an additional `if` condition, specified after the pattern in a match arm, that must also match for that arm to be chosen. The condition can use variables created in the pattern.

```rust
    let num = Some(4);

    match num {
        Some(x) if x % 2 == 0 => println!("The number {x} is even"),
        Some(x) => println!("The number {x} is odd"),
        None => (),
    }
```

###### 641. When allowed *match guard*?

They are only available in `match` expressions, not in `if let` or `while let` expressions.

###### 642. How we can use match guards to solve pattern-shadowing problem?

```rust
// Filename: src/main.rs
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(n) if n == y => println!("Matched, n = {n}"), //The match guard if n == y is not a pattern and therefore doesn’t introduce new variables. This y is the outer y rather than a new y shadowing it, and we can look for a value that has the same value as the outer y by comparing n to y.
        _ => println!("Default case, x = {x:?}"),
    }

    println!("at the end: x = {x:?}, y = {y}");
}
```

###### 643. How we can use match guards whit 'or' operator `|`?

```rust
    let x = 4;
    let y = false;

    match x {
        4 | 5 | 6 if y => println!("yes"),
        _ => println!("no"),
    }
```

##### @ Bindings

###### 644. For what used *at* `@` Bindings operator in patterns?

The *at* operator `@` lets us create a variable that holds a value at the same time as we’re testing that value for a pattern match.

```rust
    enum Message {
        Hello { id: i32 },
    }

    let msg = Message::Hello { id: 5 };

    match msg {
        Message::Hello {
            id: id_variable @ 3..=7, // By specifying id_variable @ before the range 3..=7, we’re capturing whatever value matched the range while also testing that the value matched the range pattern.
        } => println!("Found an id in range: {id_variable}"),
        Message::Hello { id: 10..=12 } => {
            println!("Found an id in another range")
        }
        Message::Hello { id } => println!("Found some other id: {id}"),
    }
```


### Advanced Features

#### 20.1 Unsafe Rust

###### 645. What is Unsafe Rust?

Regular rust code had Rust’s memory safety guarantees enforced at compile time.  However, Rust has a second language hidden inside it that doesn’t enforce these memory safety guarantees: it’s called unsafe Rust and gives us extra superpowers.

###### 646. What is Unsafe Rust for?

unsafe Rust gives us extra superpowers.

###### 647. Why exists Unsafe Rust?

Unsafe Rust exists because, by nature, static analysis is conservative. When the compiler tries to determine whether or not code upholds the guarantees, it’s better for it to reject some valid programs than to accept some invalid programs. Although the code might be okay, if the Rust compiler doesn’t have enough information to be confident, it will reject the code. In these cases, you can use unsafe code to tell the compiler, “Trust me, I know what I’m doing.”

Another reason Rust has an unsafe alter ego is that the underlying computer hardware is inherently unsafe. If Rust didn’t let you do unsafe operations, you couldn’t do certain tasks. Rust needs to allow you to do low-level systems programming, such as directly interacting with the operating system or even writing your own operating system. Working with low-level systems programming is one of the goals of the language.

##### Unsafe Superpowers

###### 648. How switch to unsafe Rust?

To switch to unsafe Rust, use the unsafe keyword and then start a new block that holds the unsafe code.

###### 649. There is the borrow checking in unsafe Rust?

`unsafe` doesn’t turn off the borrow checker or disable any other of Rust’s safety checks: if you use a reference in unsafe code, it will still be checked. The unsafe keyword only gives you access to  'unsafe superpowers' five features that are then not checked by the compiler for memory safety.

###### 650. What is intent of 'unsafe' block?

the intent is that as the programmer, will ensure the code inside an unsafe block will access memory in a valid way. By requiring five unsafe operations to be inside blocks annotated with `unsafe` the programmer will know that any errors related to memory safety must be within an unsafe block.

###### 651. What we call unsafe superpowers?

Those superpowers include the ability to:

- Dereference a raw pointer
- Call an unsafe function or method
- Access or modify a mutable static variable
- Implement an unsafe trait
- Access fields of a `union`

###### 652. What is Safe API?

Safe API is a safe abstraction over unsafe code.

##### Dereferencing a Raw Pointer

###### 653. What is Raw Pointers?

Raw Pointers are Unsafe Rust types that are similar to references and allows executes unsafe operations on the values they point to.

###### 654. What are the raw pointers?

raw pointers can be immutable or mutable

###### 655. How raw pointers are written?

Raw pointers written as `*const T` and `*mut T`, respectively. The asterisk isn’t the dereference operator; it’s part of the type name.

###### 656. What means 'immutable' in the context of raw pointers?

In the context of raw pointers, immutable means that the pointer can’t be directly assigned to after being dereferenced.

###### 657. What different raw pointers from references and smart pointers? 

raw pointers:

` Are allowed to ignore the borrowing rules by having both immutable and mutable pointers or multiple mutable pointers to the same location
` Aren’t guaranteed to point to valid memory
` Are allowed to be null
` Don’t implement any automatic cleanup

###### 658. Can we create raw pointers outside `unsafe` block in safe code?

We can create raw pointers in safe code; we just can’t dereference raw pointers outside an unsafe block.

```rust
    let mut num = 5;

    let r1 = &raw const num; // immutable
    let r2 = &raw mut num; //  mutable
```

###### 659. What restrictions of using raw pointers in safe code?

We can create raw pointers in safe code; we just can’t dereference raw pointers outside an unsafe block.

###### 660. How create raw pointer?

We’ve created raw pointers by using the `raw` borrow operators: `&raw const var_name_of_type_T` creates a '*const T' immutable raw pointer, and `&raw mut var_name_of_type_T` creates a '*mut T' mutable raw pointer.

```rust
    let mut num = 5;

    let r1 = &raw const num; // immutable
    let r2 = &raw mut num; //  mutable
```

###### 661. What is the danger of using raw pointers?

With raw pointers, we can create a mutable pointer and an immutable pointer to the same location and change data through the mutable pointer, potentially creating a data race

###### 662. Why would ever use raw pointers?

- One major use case is when interfacing with C code
- Another case is when building up safe abstractions that the borrow checker doesn’t understand.

###### 663. What we can dereference raw pointers?

We use the dereference operator `*` on a raw pointer that located inside unsafe block.

```rust
    let mut num = 5;

    let r1 = &raw const num;
    let r2 = &raw mut num;

    unsafe {
        println!("r1 is: {}", *r1);
        println!("r2 is: {}", *r2);
    }
```

##### Calling an Unsafe Function or Method

###### 664. What is Unsafe Function?

Unsafe Function is function that has requirements we need to uphold when we call this function, because Rust can’t guarantee we’ve met these requirements. By calling an unsafe function within an unsafe block, we’re saying that we’ve read this function’s documentation and take responsibility for upholding the function’s contracts.

###### 665. How is an unsafe function indicated?

Unsafe functions and methods look exactly like regular functions and methods, but they have an extra `unsafe` before the rest of the definition.

###### 666. How call Unsafe Function?

We must call an Unsafe Function within a separate `unsafe` block. If we try to call Unsafe Functions without the unsafe block, we’ll get an error.

###### 667. How we must perform unsafe operations in the body of an unsafe function?

To perform unsafe operations in the body of an unsafe function, you still need to use an `unsafe` block just as within a regular function, and the compiler will warn you if you forget. This helps to keep `unsafe` blocks as small as possible, as unsafe operations may not be needed across the whole function body.

###### 668. Is the function unsafe if it contain unsafe code?

Just because a function contains unsafe code doesn’t mean we need to mark the entire function as unsafe. In fact, wrapping unsafe code in a safe function is a common abstraction

```rust
use std::slice;

fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = values.len();
    // return  (&mut values[..mid], &mut values[mid..]) error two mutable borrow
    let ptr = values.as_mut_ptr();

    assert!(mid <= len);


    unsafe {
        (
            slice::from_raw_parts_mut(ptr, mid), // The function slice::from_raw_parts_mut is unsafe because it takes a raw pointer and must trust that this pointer is valid. 
            slice::from_raw_parts_mut(ptr.add(mid), len - mid), // The add method on raw pointers is also unsafe, because it must trust that the offset location is also a valid pointer.
        )
    }
}
```

```rust
// Filename: src/main.rs
fn main() {
    let mut v = vec![1, 2, 3, 4, 5, 6];

    let r = &mut v[..];

    let (a, b) = r.split_at_mut(3);

    assert_eq!(a, &mut [1, 2, 3]);
    assert_eq!(b, &mut [4, 5, 6]);
}
```

###### 669. What is FFI?

FFI is an abbreviation of Foreign Function Interface is a way for a programming language to define functions and enable a different (foreign) programming language to call those functions.

###### 670. What is the `extern` Rust keyword used for?

`extern` keyword facilitates the creation and use of a Foreign Function Interface (FFI).

```rust
Filename: src/main.rs
unsafe extern "C" {
    fn abs(input: i32) -> i32; //  the abs function from the C standard library
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

###### 671. Way need declare `extern` block by `unsafe` keyword?

Functions declared within `extern` blocks are usually unsafe to call from Rust code, so they must also be marked `unsafe`. The reason is that other languages don’t enforce Rust’s rules and guarantees, and Rust can’t check them, so responsibility falls on the programmer to ensure safety.

###### 672. How to define an extern function defined in another language?

Within the `unsafe extern "C" {}` block, we list the names and signatures of external functions from another language we want to call. The "C" part defines which application binary interface (ABI) the external function uses: the ABI defines how to call the function at the assembly level. The "C" ABI is the most common and follows the C programming language’s ABI.
If we know that particular function does not have any memory safety considerations, we can use the `safe` keyword to say that this specific function is safe to call even though it is in an unsafe extern block.

```rust
// Filename: src/main.rs
unsafe extern "C" {
    safe fn abs(input: i32) -> i32;
}

fn main() {
    println!("Absolute value of -3 according to C: {}", abs(-3));
}
```

###### 673. How to call an extern function defined in another language?

- first we must define an extern function.
- next, if we define this function whit `safe` keyword, that is, we believe that this function does not have any memory safety considerations,  we can call this function as ordinary safe Rust function.
- if the function is defined without `safe` keyword we must call in inside `unsafe` block.

```rust
unsafe extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

###### 674. How call Rust Functions from Other Languages?

We should create an interface that allows other languages to call Rust functions. We add the extern keyword and specify the ABI to use just before the `fn` keyword for the relevant function. We also need to add a `#[unsafe(no_mangle)]` annotation to tell the Rust compiler not to mangle the name of this function.

```rust
// In the following example, we make the call_from_c function accessible from C code, after it’s compiled to a shared library and linked from C:

#[unsafe(no_mangle)]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

###### 675. What is *Mangling*?

Mangling is when a compiler changes the name we’ve given a function to a different name that contains more information for other parts of the compilation process to consume but is less human readable.

##### Accessing or Modifying a Mutable Static Variable.

###### 676. How create static variable?

We point `static` keyword followed name in SCREAMING_SNAKE_CASE naming convention to which binding value of type: reference with the 'static lifetime.

```rust
Filename: src/main.rs
static HELLO_WORLD: &str = "Hello, world!";

fn main() {
    println!("name is: {HELLO_WORLD}");
}
```

###### 677. What is Static Variables?

A Static Variables is a Global variables, that is they are available from all places of program.

###### 678. Way convention of naming static variables?

SCREAMING_SNAKE_CASE

###### 679. What value can store static variable?

Static variables can only store references with the 'static lifetime, which means the Rust compiler can figure out the lifetime and we aren’t required to annotate it explicitly. Accessing an immutable static variable is safe.

###### 680. What is differences static variables from constants?

- Values in a static variable have a fixed address in memory. Using the value will always access the same data. Constants, on the other hand, are allowed to duplicate their data whenever they’re used. 
- Another difference is that static variables can be mutable.

###### 681. Is it safe accessing and modifying mutable static variables?

Accessing and modifying mutable static variables is unsafe.

###### 682. What is unsafe using mutable static variables?

If two threads are accessing the same mutable global variable, it can cause a data race.

###### 683. How we must access a mutable static variables?

So accessing and modifying mutable static variables is unsafe we must access it in `unsafe` block.

```rust
Filename: src/main.rs
static mut COUNTER: u32 = 0;

/// SAFETY: Calling this from more than a single thread at a time is undefined
/// behavior, so you *must* guarantee you only call it from a single thread at
/// a time.
unsafe fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    unsafe {
        // SAFETY: This is only called from a single thread in `main`.
        add_to_count(3);
        println!("COUNTER: {}", *(&raw const COUNTER));
    }
}
```

###### 684. How we should comment unsafe function?

Whenever we write an unsafe function, it is idiomatic to write a comment starting with `SAFETY` and explaining what the caller needs to do to call the function safely.

###### 685. How we should comment unsafe operation?

whenever we perform an unsafe operation, it is idiomatic to write a comment starting with SAFETY to explain how the safety rules are upheld.

###### 686. How create reference to static mutable variable?

The compiler will not allow you to create references to a mutable static variable. You can only access it via a raw pointer, created with one of the raw borrow operators. That includes in cases where the reference is created invisibly, as when it is used in the println!. The requirement that references to static mutable variables can only be created via raw pointers helps make the safety requirements for using them more obvious.

##### Implementing an Unsafe Trait

###### 687. When Trait is unsafe?

A trait is unsafe when at least one of its methods has some invariant that the compiler can’t verify. We declare that a trait is unsafe by adding the `unsafe` keyword before trait and marking the implementation of the trait as `unsafe` too.

###### 688. How declare unsafe Trait?

We declare that a trait is unsafe by adding the `unsafe` keyword before trait and marking the implementation of the trait as `unsafe` too.

```rust
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}

fn main() {}
```

##### Accessing Fields of a Union

###### 689. What is Union?

A union is similar to a struct, but only one declared field is used in a particular instance at one time. Unions are primarily used to interface with unions in C code. You can learn more about unions in the [Rust Reference](https://doc.rust-lang.org/reference/items/unions.html).

###### 690. How to access a Union fields?

Accessing union fields is unsafe because Rust can’t guarantee the type of the data currently being stored in the union instance, so accessing fields of a union can only in `unsafe` block.

##### Using Miri to check unsafe code

###### 691. What is Miri?

When writing unsafe code, you might want to check that what you have written actually is safe and correct. One of the best ways to do that is to use [Miri](https://github.com/rust-lang/miri), an official Rust tool for detecting undefined behavior.

###### 692. How Miri check unsafe code?

Whereas the borrow checker is a static tool which works at compile time, Miri is a dynamic tool which works at runtime. It checks your code by running your program, or its test suite, and detecting when you violate the rules it understands about how Rust should work. 
Miri doesn’t catch everything you might get wrong when writing unsafe code. For one thing, since it is a dynamic check, it only catches problems with code that actually gets run. That means you will need to use it in conjunction with good testing techniques to increase your confidence about the unsafe code you have written. For another thing, it does not cover every possible way your code can be unsound. If Miri does catch a problem, you know there’s a bug, but just because Miri doesn’t catch a bug doesn’t mean there isn’t a problem. Miri can catch a lot, though. 

###### 693. What is required to use Miri?

Using Miri requires a nightly build of Rust.

###### 694. How install Miri?

You can install both a nightly version of Rust and the Miri tool by typing `rustup +nightly component add miri`

###### 695. How run Miri?

You can run Miri on a project by typing cargo +nightly miri run or `cargo +nightly miri test`.

###### 696. Where deeper exploration of how to work effectively with unsafe Rust?

[Rustonomicon](https://doc.rust-lang.org/nomicon/)

#### 20.2 Advanced Traits

##### Specifying Placeholder Types in Trait Definitions with Associated Types

###### 697. What is Trait whit associated type?

This is a trait that point type placeholder for associated types as some name that trait then is using in method definitions. Implementors of the trait must provide a type to stand in for the associated type placeholder.

###### 698. What is used Trait whit associated type for?

By using definition of Trait whit associated type we can define a trait that uses some types without needing to know exactly what those types are until the trait is implemented.

###### 699. How to define Trait whit associated type?

We point `type` keyword followed name of type TYPE_NAME that is associated types placeholder, then we can use type placeholder in trait method definitions as `Self::TYPE_NAME`

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}
```

###### 700. How implement Trait whit associated type?

The implementor of a trait will specify the concrete type to be used instead of the placeholder type for the particular implementation.

```rust
impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        // --snip--
```

##### Default Generic Type Parameters and Operator Overloading

###### 701. Why can we specify a specific default type for a generic type?

This eliminates the need for implementors of the trait to specify a concrete type if the default type works.

###### 702. How specify a default type when declaring a generic type?

You specify a default type when declaring a generic type with the `<PlaceholderType=ConcreteType>` syntax.

```rust
trait Add<Rhs=Self> { // Rhs=Self: this syntax is called default type parameters. 
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}
```

```rust
// Filename: src/main.rs

use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point { // we don’t specify a concrete type for Rhs when we implement the Add trait, the type of Rhs will default to Self, which will be the type we’re implementing Add on
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(
        Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
        Point { x: 3, y: 3 }
    );
}
```

```rust
// Filename: src/lib.rs
use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters { // To add Millimeters and Meters, we specify impl Add<Meters> to set the value of the Rhs type parameter instead of using the default of Self.
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

##### Fully Qualified Syntax for Disambiguation: Calling Methods with the Same Name

###### 703. How we can call method that have the same name in different trait that is implemented by  type or in self implementation?

If we will call trait method we must used Fully Qualified Syntax, that is we specify the trait name before the method name. We also can use Fully Qualified Syntax for types method, but this is not obligatory, ordinary method call will by default call type method.

```rust
Filename: src/main.rs
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}
```

```rust
Filename: src/main.rs
fn main() {
    let person = Human;
    Pilot::fly(&person);
    Wizard::fly(&person);
    person.fly();
}
```

###### 704. How we can call non-method function that have the same name in different implemented trait or in self implementation?

When there are multiple types or traits that define non-method functions with the same function name we need to use fully qualified syntax. We must provide Rust with a type annotation within the angle brackets with following definitions: Type name, `as` keyword, name of Trait which function we will call. After this type annotation we does call to target function past two colon.

```rust
trait Animal {
    fn baby_name() -> String;
}

struct Dog;

impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}

impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}

fn main() {
    println!("A baby dog is called a {}", <Dog as Animal>::baby_name());
}
```

###### 705. Which is general fully qualified syntax?

`<Type as Trait>::function(receiver_if_method, next_arg, ...);`

##### Using Supertraits to Require One Trait’s Functionality Within Another Trait

###### 706. What is Supertrait?

Sometimes, you might write a trait definition that depends on another trait: for a type to implement the first trait, you want to require that type to also implement the second trait. You would do this so that your trait definition can make use of the associated items of the second trait. The trait your trait definition is relying on is called a supertrait of your trait.

###### 707. How to define Supertrait?

We can do that in the trait definition by specifying supertrait name after defined trait name past colon `:`. When implement trait for type we must provide implementation supertrait for that type.

```rust
use std::fmt;

trait OutlinePrint: fmt::Display { // define Supertrait
    fn outline_print(&self) { // define default method
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {output} *");
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}

struct Point {
    x: i32,
    y: i32,
}

impl OutlinePrint for Point {} // implement trait

use std::fmt;

impl fmt::Display for Point { // implement supertrait
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}
```

##### Using the Newtype Pattern to Implement External Traits on External Types

###### 708. What is Newtype pattern used for?

When implementing trait on a type we must follows 'orphan rule' that states we’re only allowed to implement a trait on a type if either the trait or the type are local to our crate. To get around this restriction is used the 'newtype pattern', which involves creating a new type in a tuple struct.

###### 709. How use Newtype pattern for Implement External Traits on External Types?

We must wrap External Type to tuple struct with one field, that is the wrapper type is local to our crate, and then we can implement the trait on the wrapper, implementing the required trait functionality for the wrapped type inside the wrapper.

```rust
use std::fmt;

struct Wrapper(Vec<String>);

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {w}");
}
```

#### 20.3 Advanced Types.

##### Using the Newtype Pattern for Type Safety and Abstraction.

###### 710. What are the possibilities of using the Newtype pattern?

- Implement External Traits on External Types
- use the newtype pattern to abstract away some implementation details of a type: the new type can expose a public API that is different from the API of the private inner type
- The newtype pattern is a lightweight way to achieve encapsulation to hide implementation details,

##### Creating Type Synonyms with Type Aliases.

###### 711. How create Type Synonyms?

###### 712. What is Type Alias?

Type Alias a mean to give an existing type another name. A type alias makes this code more manageable by reducing the repetition.

```rust
    type Thunk = Box<dyn Fn() + Send + 'static>; // type alias

    let f: Thunk = Box::new(|| println!("hi"));

    fn takes_long_type(f: Thunk) {
        // --snip--
    }

    fn returns_long_type() -> Thunk {
        // --snip--
    }
```

Type aliases are also commonly used with the `Result<T, E>` type for reducing repetition. 

```rust

type Result<T> = std::result::Result<T, std::io::Error>;

pub trait Write {
    fn write(&mut self, buf: &[u8]) -> Result<usize>;
    fn flush(&mut self) -> Result<()>;

    fn write_all(&mut self, buf: &[u8]) -> Result<()>;
    fn write_fmt(&mut self, fmt: fmt::Arguments) -> Result<()>;
}
```

##### The Never Type that Never Returns.

###### 713. What is Never Type?

Never Type is type that has no values.

###### 714. How denoted Never Type?

Never Type denoted by `!` (exclamation mark). It stands in the place of the return type when a function will never return.

```rust
fn bar() -> ! {
    // --snip--
}
```

###### 715. What is *diverging functions*?

Functions that return *never* are called *diverging functions*. We can’t create values of the type `!` so function can never possibly return.

###### 716. What use is a type you can never create values for?

Expressions of type ! can be coerced into any other type. So there is some situations when Never Type useful:

- `match` arms must all return the same type. When we using `match` expression and one arm executes `continue`, the return type of `continue` is Never Type so Rust coerced it into type of `match` expression.

```rust
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
```

- `panic!` macro return Never Type. When we call `panic!` macro inside function Rust coerced Never Type into return type of function.

```rust
impl<T> Option<T> {
    pub fn unwrap(self) -> T { // Rust sees that val has the type T and panic! has the type !, so the result of the overall match expression is T
        match self {
            Some(val) => val,
            None => panic!("called `Option::unwrap()` on a `None` value"),
        }
    }
}
```

- the `loop` expression never ends, so ! is its value. However, this will not be true if we included a `break`, because the loop will terminate when it got to the `break`.

```rust
    print!("forever ");

    loop {
        print!("and ever ");
    }
```

##### Dynamically Sized Types and the Sized Trait

###### 717. What is DST?

Rust needs to know certain details about its types, such as how much space to allocate for a value of a particular type. DST is abbreviation from "dynamically sized types", that denotes types that let us write code using values whose size we can know only at runtime.

###### 718. What is "unsized type"?

"Unsized type" is synonym to "dynamically sized types".

###### 719. What DSTs are there in Rust?

 Slices and trait objects (`dyn Trait`).

###### 720. How we can use DST?

We can use DST only in combination with some type of Pointer: `&[T]`, `Box<[T]>`, `Rc<[T]>`, `&dyn Trait`, `Box<dyn Trait>` `Rc<dyn Trait>` etc.

###### 721. What is `Sized` trait?

To work with DSTs, Rust provides the `Sized` trait to determine whether or not a type’s size is known at compile time. This trait is automatically implemented for everything whose size is known at compile time. In addition, Rust implicitly adds a bound on `Sized` to every generic function.

```rust
fn generic<T>(t: T) {
    // --snip--
}

// is actually treated as though we had written this:

fn generic<T: Sized>(t: T) {
    // --snip--
}
```

###### 722. How we can provide DST as type arguments to generic type parameters?

DSTs can be provided as type arguments to generic type parameters having the special `?Sized` bound. They can also be used for associated type definitions when the corresponding associated type declaration has a `?Sized` bound. By default, any type parameter or associated type has a `Sized` bound, unless it is relaxed using `?Sized`.

```rust
fn generic<T: ?Sized>(t: &T) {
    // --snip--
}
```

###### 723. Can we implement Trait for DSTs?

Traits may be implemented for DSTs. Unlike with generic type parameters, Self: ?Sized is the default in trait definitions.

###### 724. Can a struct contain a DST?

Structs may contain a DST as the last field; this makes the struct itself a DST.

#### 20.4 Advanced Functions and Closures.

##### Function Pointers

###### 725. Can you pass a function to a function?

We can pass regular functions to functions.

###### 726. What is Function pointer type?

Function pointer is pointer that refer to a function whose identity is not necessarily known at compile-time. They can be created via a coercion to the type `fn` from both function items and non-capturing, non-async closures.

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}

let mut x = add(5,7);

type Binop = fn(i32, i32) -> i32;
let bo: Binop = add; // pointer
x = bo(5,7);
```

###### 727. How we can pass a function to a function?

We can pass function by function pointer type `fn`. They can be created via a coercion to the type `fn` from a function.

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

fn main() {
    let answer = do_twice(add_one, 5);

    println!("The answer is: {answer}");
}
```

###### 728. Can we specify `fn` as the parameter type directly?

Unlike closures, fn is a type rather than a trait, so we specify fn as the parameter type directly rather than declaring a generic type parameter with one of the Fn traits as a trait bound.

###### 729. Can we pass function pointer as an argument for a function that expects a closure?

Function pointers implement all three of the closure traits (Fn, FnMut, and FnOnce), meaning you can always pass a function pointer as an argument for a function that expects a closure. It’s best to write functions using a generic type and one of the closure traits so your functions can accept either functions or closures. That said, one example of where you would want to only accept fn and not closures is when interfacing with external code that doesn’t have closures: C functions can accept functions as arguments, but C doesn’t have closures.

```rust
    let list_of_numbers = vec![1, 2, 3];
    let list_of_strings: Vec<String> =
        // list_of_numbers.iter().map(|i| i.to_string()).collect(); // passing closure
        list_of_numbers.iter().map(ToString::to_string).collect(); // passing fn
```

###### 730. Can we used name of enum variant as closure to pass in to function?

name of each enum variant becomes an initializer function. We can use these initializer functions as function pointers that implement the closure traits, which means we can specify the initializer functions as arguments for methods that take closures.

```rust
    enum Status {
        Value(u32),
        Stop,
    }

    let list_of_statuses: Vec<Status> = (0u32..20).map(Status::Value).collect();
```

##### Returning Closures

###### 731. Can we return Closure directly?

Closures are represented by traits, in most cases where you might want to return a trait, you can instead use the concrete type that implements the trait as the return value of the function. However, you can’t do that with closures because they don’t have a concrete type that is returnable - which means you can’t return closures directly.

###### 732. How we can return Closure from function?

We can’t return closures directly. Instead, we will normally use the `impl Trait` syntax. You can return any function type, using `Fn`, `FnOnce` and `FnMut`.

```rust
fn returns_closure() -> impl Fn(i32) -> i32 {
    |x| x + 1
}
```

However, each closure is also its own distinct type. If you need to work with multiple functions that have the same signature but different implementations, you will need to use a trait object for them

```rust
fn main() {
    let handlers = vec![returns_closure(), returns_initialized_closure(123)];
    for handler in handlers {
        let output = handler(5);
        println!("{output}");
    }
}

fn returns_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x + 1)
}

fn returns_initialized_closure(init: i32) -> Box<dyn Fn(i32) -> i32> {
    Box::new(move |x| x + init)
}
```

#### 20.5 Macros

###### 733. What read about how to write macros?

[“The Little Book of Rust Macros”](https://veykril.github.io/tlborm/)

###### 734. What is macros?

Fundamentally, macros are a way of writing code that writes other code, which is known as metaprogramming.

The term macro refers to a family of features in Rust: declarative macros with macro_rules! and three kinds of procedural macros:

- Custom `#[derive]` macros that specify code added with the derive attribute used on structs and enums
- Attribute-like macros that define custom attributes usable on any item
- Function-like macros that look like function calls but operate on the tokens specified as their argument

###### 735. The Difference Between Macros and Functions

###### 736. What difference between Macros and Function?

- Macros is called at compile time before compiler interprets the meaning of the code and is used for write code that will executed at runtime. Function is executable code and executed at runtime.
- A function signature must declare the number and type of parameters the function has. Macros, on the other hand, can take a variable number of parameters
- The downside to implementing a macro instead of a function is that macro definitions are more complex than function definitions because you’re writing Rust code that writes Rust code. Due to this indirection, macro definitions are generally more difficult to read, understand, and maintain than function definitions.
- Another important difference between macros and functions is that you must define macros or bring them into scope before you call them in a file, as opposed to functions you can define anywhere and call anywhere.

##### Declarative Macros with macro_rules! for General Metaprogramming

###### 737. What is Declarative Macros?

Declarative Macros is most widely used form of macros in Rust. These are also sometimes referred to as “macros by example,” “macro_rules! macros,” or just plain “macros.” At their core, declarative macros allow you to write something similar to a Rust match expression. In case of macros the value is the literal Rust source code passed to the macro; the patterns are compared with the structure of that source code; and the code associated with each pattern, when matched, replaces the code passed to the macro. This all happens during compilation.

###### 738. How define a Declarative Macros?

To define a macro, you use the `macro_rules!` construct.

```rust
// simplified definition of the vec! macro.

// let v: Vec<u32> = vec![1, 2, 3];

// Filename: src/lib.rs


//  annotation indicates that this macro should be made available whenever the crate in which the macro is defined is brought into scope. Without this annotation, the macro can’t be brought into scope.
#[macro_export] 
macro_rules! vec {
     // Here we have one arm with the pattern ( $( $x:expr ),* ), followed by => and the block of code associated with this pattern
    ( $( $x:expr ),* ) => {
    // 1. "()" - encompass the whole pattern
    // 2. "$" - declare a variable in the macro system that will contain the Rust code matching the pattern
    // 3. "()" - set of parentheses that captures values that match the pattern within the parentheses for use in the replacement code
    // 4. "$x:expr"  matches any Rust expression and gives the expression the name $x
    // 5. "," indicates that a literal comma separator character must appear between each instance of the code that matches the code within $()
    // 6. "*" specifies that the pattern matches zero or more of whatever precedes the *
    // 7. When we call this macro with vec![1, 2, 3];, the $x pattern matches three times with the three expressions 1, 2, and 3.
    // 8. the code generated that replaces this macro call will be the following:
    /*
    {
      let mut temp_vec = Vec::new();
      temp_vec.push(1);
      temp_vec.push(2);
      temp_vec.push(3);
      temp_vec
    }
    */

Now let’s look at the patter
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

##### Procedural Macros for Generating Code from Attributes

###### 739. What is Procedural Macro?

Procedural macros accept some code as an input, operate on that code, and produce some code as an output rather than matching against patterns and replacing the code with other code as declarative macros do.

###### 740. How is kinds of procedural macros?

- custom derive
- attribute-like
- function-like

###### 741. How create procedural macros?

When creating procedural macros, the definitions must reside in their own crate with a special crate type.

```rust
// Filename: src/lib.rs
use proc_macro;

#[some_attribute] // some_attribute is a placeholder for using a specific macro variety.
pub fn some_name(input: TokenStream) -> TokenStream {
    // The TokenStream type is defined by the proc_macro crate that is included with Rust and represents a sequence of tokens.
    //  the source code that the macro is operating on makes up the input TokenStream
    // the code the macro produces is the output TokenStream
    // The function also has an attribute attached to it that specifies which kind of procedural macro we’re creating
}
```

##### How to Write a Custom derive Macro

###### 742. For what using derive Macro?

Derive Macro using with struct and enum for generating code for the derive attribute.

###### 743. How to Write a Custom derive Macro?

- create a new project directory
  `mkdir new-project`
  `cd new-project`

- make a new library crate whit trait and its associated function that will be implementing by derive Macro.
  `cargo new hello_macro --lib`

  ```rust
  // Filename: hello_macro/src/lib.rs

  pub trait HelloMacro {
      fn hello_macro();
  }
  ```

- create a procedural macro.
  - create new library crate called `for_crate_name_derive` inside our project
    The convention for structuring crates and macro crates is as follows: for a crate named `foo`, a custom derive procedural macro crate is called `foo_derive`
    `$ cargo new hello_macro_derive --lib`

  - declare the crate as a procedural macro crate and add `syn` and `quote` crates as dependencies.
  
    ```toml
    <!-- Filename: hello_macro_derive/Cargo.toml -->

    [lib]
    proc-macro = true

    [dependencies]
    syn = "2.0"
    quote = "1.0"
    ```

  - defining the procedural macro

    ```rust
    // Filename: hello_macro_derive/src/lib.rs

    use proc_macro::TokenStream;
    use quote::quote;

    #[proc_macro_derive(HelloMacro)]
    // The hello_macro_derive function will be called when a user of our library specifies #[derive(HelloMacro)] on a type
    pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
        // Construct a representation of Rust code as a syntax tree
        // that we can manipulate
        let ast = syn::parse(input).unwrap(); // return DeriveInput
        /*
        documentation for DeriveInput https://docs.rs/syn/2.0/syn/struct.DeriveInput.html
        DeriveInput {
            // --snip--

            ident: Ident {
                ident: "Pancakes",
                span: #0 bytes(95..103)
            },
            data: Struct(
                DataStruct {
                    struct_token: Struct,
                    fields: Unit,
                    semi_token: Some(
                        Semi
                    )
                }
            )
        }
        */

        // Build the trait implementation
        impl_hello_macro(&ast)
    }

    fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
        let name = &ast.ident;
        let gen = quote! {
            impl HelloMacro for #name {
                fn hello_macro() {
                    println!("Hello, Macro! My name is {}!", stringify!(#name));
                }
            }
        };
        gen.into()
    }
    ```

- using procedural macro

  - create new binary project in your projects directory
    `cargo new pancakes`

  - add trite and procedural macro crates as dependencies in this binary crate’s Cargo.toml

    ```toml
    <!-- Filename: pancakes/Cargo.toml -->

    hello_macro = { path = "../hello_macro" }
    hello_macro_derive = { path = "../hello_macro/hello_macro_derive" }
    ```

  - defining code that is using procedural macro

    ```rust
    // Filename: pancakes/src/main.rs


    use hello_macro::HelloMacro;
    use hello_macro_derive::HelloMacro;

    #[derive(HelloMacro)]
    struct Pancakes;

    fn main() {
        Pancakes::hello_macro();
    }
    ```

###### 744. For what is used `proc_macro` crate?

The `proc_macro` crate is the compiler’s API that allows us to read and manipulate Rust code from our code. The `proc_macro` crate comes with Rust, so we didn’t need to add that to the dependencies in Cargo.toml.

###### 745. For what is used `syn` crate?

The `syn` crate parses Rust code from a string into a data structure that we can perform operations on.

###### 746. For what is used `quote` crate?

The `quote` crate turns syn data structures back into Rust code.

##### Attribute-like macros

###### 747. What is Attribute-like macros

Attribute-like macros are similar to custom derive macros, but instead of generating code for the derive attribute, they allow you to create new attributes. They’re also more flexible: derive only works for structs and enums; attributes can be applied to other items as well, such as functions.

###### 748. How define and use Attribute-like macros?

```rust
#[route(GET, "/")]
fn index() {
```

```rust
// create a crate with the proc-macro crate type and implement a function that generates the code you want
#[proc_macro_attribute]
// we have two parameters of type TokenStream. The first is for the contents of the attribute: the GET, "/" part. The second is the body of the item the attribute is attached to: in this case, fn index() {} and the rest of the function’s body.
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
```

##### Function-like macros

###### 749. How define and use Function-like macros?

Function-like macros define macros that look like function calls. Similarly to macro_rules! macros, they’re more flexible than functions; for example, they can take an unknown number of arguments. However, macro_rules! macros can be defined only using the match-like syntax. Function-like macros take a TokenStream parameter and their definition manipulates that TokenStream using Rust code as the other two types of procedural macros do.

```rust
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
```

```rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```

### Final Project: Building a Multithreaded Web Server

