# Roust

## install

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

## RUST IN PRACTICE A Programmers Guide to Build Rust Programs, Test Applications and Create Cargo Packages (Second Edition) Rick Tim

#### Rust Syntax

##### Variables

```rust
let x: i32 = 5;
let y: f64 = 3.14;
let x = 5; // Immutable integer, type i32 inferred
let mut y = 3.14; // Mutable floating-point number, type f64 inferred
let name = "John"; // Immutable string slice, type &str inferred
```

##### Functions

```rust
fn add(x: i32, y: i32) -> i32 {
x + y // Implicit return (no semicolon), returns the sum of x and y
}
```

##### Control Flow

```rust
let x = 5;
if x > 0 {
println!("x is positive");
} else {
println!("x is negative or zero");
}
// Demonstrating a controlled loop with a break condition
loop {
println!("This loop will intentionally run only once for
demonstration.");
break;
}
let y = 5;
match y {
    1 => println!("y is 1"),
2 => println!("y is 2"),
_ => println!("y is something else"), // catch-all pattern
}
```

##### Structs

```rust
struct Point {
x: i32,
y: i32,
}
let p = Point { x: 5, y: 10 };
println!("Point coordinates: ({}, {})", p.x, p.y);
```


##### Traits

```rust
trait Animal {
fn make_sound(&self) -> &'static str;
}
struct Dog;
impl Animal for Dog {
fn make_sound(&self) -> &'static str {
"bark"
}
}
let dog = Dog;
println!("The dog says {}", dog.make_sound());
```

##### Writing ‘Hello world’

- Open your terminal and run cargo new hello_world. This command creates a new directory called hello_world with a Cargo.toml file (which describes your project and its dependencies) and a src directory with a main.rs file.
- Open the src/main.rs file and replace its contents with the
"Hello, World!" program shown above.
- Back in your terminal, navigate to your project directory (cd
hello_world) and run cargo run. Cargo will compile your
program and then run it, printing "Hello, world!" to the console.

### My First Program: A Simple Calculator

## THE RUST PROGRAMMING LANGUAGE 2nd Edition by Steve Klabnik and Carol Nichols

### 3. Common Programming Concepts

#### Variables and Mutability

##### 1. When a variable is immutable?

By default in Rust variables are immutable. Once a value is bound to a name, you can’t change that value. We get compile-time errors when we attempt to change a value that’s designated as immutable because this very situation can lead to bugs. If one part of our code operates on the assumption that a value will never change and another part of our code changes that value, it’s possible that the first part of the code won’t do what it was designed to do. Although variables are immutable by default, you can make them mutable by adding mut in front of the variable name.

##### 2. What is constant?

Constants are values that are bound to a name and are not allowed to change, but there are a few differences between constants and variables:

- you aren’t allowed to use `mut` with constants.
- You declare constants using the `const` keyword instead of the `let` keyword
- the type of the value must be annotated.
- The last difference is that constants may be set only to a constant expression, not the result of a value that could only be computed at runtime

Rust’s naming convention for constants is to use all uppercase with underscores between words.

Constants are valid for the entire time a program runs, within the scope in which they were declared.

Naming hardcoded values used throughout your program as constants is useful in conveying the meaning of that value to future maintainers of the code. It also helps to have only one place in your code you would need to change if the hardcoded value needed to be updated in the future

##### 3. What is Shadowing?

you can declare a new variable with the same name as a previous variable. We say that the first variable is shadowed by the second, which means that the second variable is what the compiler will see when you use the name of the variable. We can shadow a variable by using the same variable’s name and repeating the use of the let keyword.

Shadowing is different from marking a variable as mut because we’ll get a compile-time error if we accidentally try to reassign to this variable without using the let keyword

The other difference between `mut` and `shadowing` is that because we’re effectively creating a new variable when we use the let keyword again, we can change the type of the value but reuse the same name.

#### Data Types

##### 4. What means data types?

Every value in Rust is of a certain data type, which tells Rust what kind of data is being specified so it knows how to work with that data

##### 5. What subsets of data types are there in rust?

In rust a two data type subsets: scalar and compound

##### 6. Why do they call rust  statically typed language?

This means that it must know the types of all variables at compile time.  The compiler can usually infer what type we want to use based on the value and how we use it. In cases when many types are possible we must add a type annotation

##### 7. What is scalar data types?

scalar data types is subset of rust data types which includes:

- integers numbers,
- floating-point numbers, 
- Booleans
- characters

##### 8. What is integer data type?

An integer is a number without a fractional component.

##### 9. What are there integers data types?

- 8-bit	i8 u8
- 16-bit i16 u16
- 32-bit i32 u32
- 64-bit i64 u64
- 128-bit i128 u128
- arch isize usize

##### 10. What means Signed and Unsigned integer data type?

Signed and unsigned refer to whether it’s possible for the number to be negative—in other words, whether the number needs to have a sign with it (signed) or whether it will only ever be positive and can therefore be represented without a sign (unsigned).

##### 11. How many value does it contain signed integer data types?

Each signed variant can store numbers from -(2^(n - 1)) to 2^(n - 1)-1 inclusive, where n is the number of bits that variant uses

##### 12. How many value does it contain unsigned integer data types?

Each unsigned variant can store numbers from 0 to 2^n-1 inclusive, where n is the number of bits that variant uses

##### 13. what length are they `isize` and `usize` types? 

length `isize` and `usize` types depend on the architecture of the computer your program is running on, which is denoted in the table as “arch”: 64 bits if you’re on a 64-bit architecture and 32 bits if you’re on a 32-bit architecture

##### 14. what is the default integer data type in Rust?

If the integer data type is not specified, Rust uses default i32

##### 15. What is integer overflow?

Let’s say you have a variable of type u8 that can hold values between 0 and 255. If you try to change the variable to a value outside that range, such as 256, integer overflow will occur, which can result in one of two behaviors. When you’re compiling in debug mode, Rust includes checks for integer overflow that cause your program to panic at runtime if this behavior occurs. Rust uses the term panicking when a program exits with an error;

When you’re compiling in release mode with the --release flag, Rust does not include checks for integer overflow that cause panics. Instead, if overflow occurs, Rust performs two’s complement wrapping. In short, values greater than the maximum value the type can hold “wrap around” to the minimum of the values the type can hold. In the case of a u8, the value 256 becomes 0, the value 257 becomes 1, and so on. The program won’t panic, but the variable will have a value that probably isn’t what you were expecting it to have. 

##### 15. What method are used to explicitly handle the possibility of integer overflow?

- Wrap in all modes with the `wrapping_*` methods, such as `wrapping_add`.
- Return the `None` value if there is overflow with the `checked_*` methods.
- Return the `value` and a `boolean` indicating whether there was overflow with the `overflowing_*` methods.
- Saturate at the value’s minimum or maximum values with the `saturating_*` methods.

##### 16. What is floating-point data type?

floating-point data type are numbers with decimal points. Rust’s floating-point types are f32 and f64, which are 32 bits and 64 bits in size, respectively. 

##### 17. what is the default floating-point data type in Rust? 

The default floating-point is f64 because on modern CPUs, it’s roughly the same speed as f32 but is capable of more precision. 

##### 18. Signed or unsigned floating-point types? 

All floating-point types are signed.

##### 19. What is boolean data type?

a Boolean type in Rust has two possible values: `true` and `false`, is specified using `bool`, Booleans are one byte in size.

##### 20. What is char data type?

Rust’s char type is four bytes in size and represents a Unicode Scalar Value. We specify char literals with single quotes,

##### 21. What is compound data types?

Compound types can group multiple values into one type. Rust has two primitive compound types: tuples and arrays.

##### 22. What is tuple data type?

A tuple is a general way of grouping together a number of values with a variety of types into one compound type. Tuples have a fixed length: once declared, they cannot grow or shrink in size.

We create a tuple by writing a comma-separated list of values inside parentheses. Each position in the tuple has a type, and the types of the different values in the tuple don’t have to be the same.

##### 22. What is pattern matching data type?

This is hte way destructure a tuple value, like this:

```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

##### 23. How to get access to tuple value?

We can use pattern matching or by using a period (.) followed by index of the value we want to access.

##### 24. What is it called tuple  without any values?

tuple  without any values called `unit`. This value and its corresponding type are both written () and represent an empty value or an empty return type. Expressions implicitly return the unit value if they don’t return any other value.

##### 25. what do expressions return f they don’t return any other value.

Expressions implicitly return the unit value if they don’t return any other value.

##### 26. What is Array type?

Array is a way to have a collection of multiple values. Unlike a tuple, every element of an array must have the same type. Unlike arrays in some other languages, arrays in Rust have a fixed length.

Arrays are useful when you want your data allocated on the stack, rather than the heap or when you want to ensure you always have a fixed number of elements.

Arrays are more useful when you know the number of elements will not need to change.

##### How create array?

- list values ​​in square brackets
  `let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];`
- write an array’s type using square brackets with the type of each element, a semicolon, and then the number of elements in the array, like so:
  `let a: [i32; 5] = [1, 2, 3, 4, 5];`
- initialize an array to contain the same value for each element by specifying the initial value, followed by a semicolon, and then the length of the array in square brackets, as shown here `let a = [3; 5];`

##### 27. How Accessing Array Elements?

An array is a single chunk of memory of a known, fixed size that can be allocated on the stack. You can access elements of an array using indexing, like this:

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

#### Functions

##### 28. What is the entry point in program in Rust

`main` function is the entry point of many programs.

##### 29. How to define function

We define a function in Rust by entering fn followed by a function name and a set of parentheses. The curly brackets tell the compiler where the function body begins and ends.

##### 30. How to write correctly function name?

Rust code uses snake case as the conventional style for function and variable names, in which all letters are lowercase and underscores separate words

##### 31. How to call function

We can call any function we’ve defined by entering its name followed by a set of parentheses.

##### 32. What is parameters function?

Parameters are special variables that are part of a function’s signature, separated by commas. When a function has parameters, you can provide it with concrete values for those parameters. Technically, the concrete values are called arguments, but in casual conversation, people tend to use the words parameter and argument interchangeably for either the variables in a function’s definition or the concrete values passed in when you call a function.

In function signatures, you must declare the type of each parameter.

#### Statements and Expressions

##### 33. What is Statement and Expression

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

##### 34. How function return values?

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

##### 35. How in Rust write comment?

comment starts with two slashes, and the comment continues until the end of the line. For comments that extend beyond a single line, you’ll need to include // on each line

comment can be on new line or be placed at the end of lines containing code

Rust also has another kind of comment, documentation comments

#### Control Flow - If expression

##### 36. what is "If" expression used for?

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

##### 37. Can use If expression in  let statement?

Because if is an expression, and therefore return value, we can use it on the right side of a let statement to assign the outcome to a variable.  Values that have the potential to be results from each arm of the if must be the same type

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

#### Control Flow - Loops

##### 39. what are Loops needed for

It’s often useful to execute a block of code more than once

##### 40. what types of iterations are there in Rust

- loop
- while
- for

##### 41. what is "loop" keyword used for?

The `loop` keyword tells Rust to execute a block of code over and over again forever or until you explicitly tell it to stop.

```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

##### 42. how stop execution `loop`?

You can place the `break` keyword within the loop to tell the program when to stop executing the loop

##### 43. how to continue a `loop` from the beginning at a certain point?

used `continue`, which in a loop tells the program to skip over any remaining code in this iteration of the loop and go to the next iteration.


##### 44. How return value from `loop`

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

##### 45. How use Labels in Loops?

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

##### 46. how can i implement conditional iteration - while

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

##### 47. how can i implement iteration of collection of elements - for

iteration over collection elements cat implement by using `loop`, `if`, `else`, and `break` set or by using `while` language construct changing the index counter at each iteration. But a more convenient way are using a `for` loop and execute some code for each item in a collection

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```

##### 48. countdown example by using `for` loop

```rust
fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```

### 4. Understanding Ownership

#### Ownership

##### 49. Why do you need to manage memory?

The program operates on data during execution. The data that the program operates on is stored in memory. Depending on the nature of the data, there are two types of storage: stack and heap.
In stack the execution data of the functions are stored as stack frames. Each frame is a block of space where the data required for that function is stored. For example, every time a function declares a new variable, it is "pushed" onto the topmost block in the stack. Then every time a function exits, the topmost block is cleared, thus all of the variables pushed onto the stack by that function, are cleared. The size of the data stored on the stack must be known at compile time.
Typical data that are stored on stack are local variables(value types or primitives, primitive constants), pointers and function frames.

If the size of the data operated by the program is not known at the compilation stage, the data will be allocated in the heap. When you put data on the heap, you request a certain amount of space. The memory allocator finds an empty spot in the heap that is big enough, marks it as being in use, and returns a pointer, which is the address of that location. This process is called allocating on the heap and is sometimes abbreviated as just allocating (pushing values onto the stack is not considered allocating). Because the pointer to the heap is a known, fixed size, you can store the pointer on the stack, but when you want the actual data, you must follow the pointer.
Unlike the stack, where memory space is freed automatically after a function exits, heap memory space must be cleared explicitly when the data stored in it is no longer needed, which is called "memory management."

##### 51. What's the difference between stack and heap

The stack stores values in the order it gets them and removes the values in the opposite order. This is referred to as last in, first out. Adding data is called pushing onto the stack, and removing data is called popping off the stack. All data stored on the stack must have a known, fixed size. Data with an unknown size at compile time or a size that might change must be stored on the heap instead.

The heap is less organized: when you put data on the heap, you request a certain amount of space. The memory allocator finds an empty spot in the heap that is big enough, marks it as being in use, and returns a pointer, which is the address of that location. This process is called allocating on the heap and is sometimes abbreviated as just allocating (pushing values onto the stack is not considered allocating). Because the pointer to the heap is a known, fixed size, you can store the pointer on the stack, but when you want the actual data, you must follow the pointer. 

Pushing to the stack is faster than allocating on the heap because the allocator never has to search for a place to store new data; that location is always at the top of the stack. Comparatively, allocating space on the heap requires more work because the allocator must first find a big enough space to hold the data and then perform bookkeeping to prepare for the next allocation.

Accessing data in the heap is slower than accessing data on the stack because you have to follow a pointer to get there. Contemporary processors are faster if they jump around less in memory.

When your code calls a function, the values passed into the function (including, potentially, pointers to data on the heap) and the function’s local variables get pushed onto the stack. When the function is over, those values get popped off the stack.

##### 51.1 What is Stack?

The stack is used for static memory allocation and as the name suggests it is a last in first out(LIFO) stack (Think of it as a stack of boxes).

- Due to this nature, the process of storing and retrieving data from the stack is very fast as there is no lookup required, you just store and retrieve data from the topmost block on it.
- But this means any data that is stored on the stack has to be finite and static(The size of the data is known at compile-time).
- This is where the execution data of the functions are stored as stack frames(So, this is the actual execution stack). Each frame is a block of space where the data required for that function is stored. For example, every time a function declares a new variable, it is "pushed" onto the topmost block in the stack. Then every time a function exits, the topmost block is cleared, thus all of the variables pushed onto the stack by that function, are cleared. These can be determined at compile time due to the static nature of the data stored here.
- Multi-threaded applications can have a stack per thread.
- Memory management of the stack is simple and straightforward and is done by the OS.
- Typical data that are stored on stack are local variables(value types or primitives, primitive constants), pointers and function frames.
- This is where you would encounter stack overflow errors as the size of the stack is limited compared to the Heap.
- There is a limit on the size of value that can be stored on the Stack for most languages.
  
##### 51.2 What is Heap?

Heap is used for dynamic memory allocation and unlike stack, the program needs to look up the data in heap using pointers (Think of it as a big multi-level library).

- It is slower than stack as the process of looking up data is more involved but it can store more data than the stack.
- This means data with dynamic size can be stored here.
- Heap is shared among threads of an application.
- Due to its dynamic nature heap is trickier to manage and this is where most of the memory management issues arise from and this is where the automatic memory management solutions from the language kick in.
- Typical data that are stored on the heap are global variables, reference types like objects, strings, maps, and other complex data structures.
- This is where you would encounter out of memory errors if your application tries to use more memory than the allocated heap(Though there are many other factors at play here like GC, compacting).
- Generally, there is no limit on the size of the value that can be stored on the heap. Of course, there is the upper limit of how much memory is allocated to the application.

##### 49. What are the methods of memory management?

Some languages have garbage collection that regularly looks for no-longer-used memory as the program runs; in other languages, the programmer must explicitly allocate and free the memory. Rust uses a third approach: memory is managed through a system of ownership with a set of rules that the compiler checks. If any of the rules are violated, the program won’t compile.

##### 50. What is the problem associated with memory management?

In most languages without a GC, it’s our responsibility to identify when memory is no longer being used and to call code to explicitly free it. Doing this correctly a difficult programming problem. If we forget, we’ll waste memory. If we do it too early, we’ll have an invalid variable. If we do it twice, that’s a bug too. We need to pair exactly one allocate with exactly one free.

##### 49. What Is Ownership?

Ownership is a set of rules that govern how a Rust program manages memory.

##### 52. Ownership Rules?

- Each value in Rust has an owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

##### 53. How does a variable become an owner?

We declare a variable and assign its value. The value can be simple or composite, i.e. consist of several values, in this case the variable with its value is pushed into the stack, if the data is dynamic, i.e. the size of the data is not known at compile time, then a request is made to the allocator and a reference to the area in the heap is placed into the stack.

##### 53. What happens when we assign a variable to another variable?



##### 53. What is scope?

A scope is the range within a program for which an item is valid

##### 54. where in a code a variable is valid?

variable is valid from the point at which it’s declared until the end of the current scope or

```rust
    {                      // s is not valid here, it’s not yet declared
        let s = "hello";   // s is valid from this point forward

        // do stuff with s
    } 
```

- When variable comes into scope, it is valid.
- It remains valid until it goes out of scope.


