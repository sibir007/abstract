# Roust

## The Rust API Guidelines.

<https://rust-lang.github.io/api-guidelines/>

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

##### What concepts ensure memory safety in Rust programs at compile time

ownership, borrowing, and slices 

#### Ownership

##### 49. Why do you need to manage memory?

The program operates on data during execution. The data that the program operates on is stored in memory. Depending on the nature of the data, there are two types of storage: stack and heap.
In stack the execution data of the functions are stored as stack frames. Each frame is a block of space where the data required for that function is stored. For example, every time a function declares a new variable, it is "pushed" onto the topmost block in the stack. Then every time a function exits, the topmost block is cleared, thus all of the variables pushed onto the stack by that function, are cleared. The size of the data stored on the stack must be known at compile time.
Typical data that are stored on stack are local variables(value types or primitives, primitive constants), pointers and function frames.

If the size of the data operated by the program is not known at the compilation stage, the data will be allocated in the heap. When you put data on the heap, you request a certain amount of space. The memory allocator finds an empty spot in the heap that is big enough, marks it as being in use, and returns a pointer, which is the address of that location. This process is called allocating on the heap and is sometimes abbreviated as just allocating (pushing values onto the stack is not considered allocating). Because the pointer to the heap is a known, fixed size, you can store the pointer on the stack, but when you want the actual data, you must follow the pointer.
Unlike the stack, where memory space is freed automatically after a function exits, heap memory space must be cleared explicitly when the data stored in it is no longer needed, which is called "memory management".

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

##### 53. how does memory allocation happen in Rust?

We declare a variable and assign its value. The value can be simple or composite, i.e. consist of several values, but all value must be scalar, i.e. its size known at compile time, in this case the variable with its value is pushed into the stack, if the data is not scalar, dynamic, i.e. the size of the data is not known at compile time, then a request is made to the allocator and a reference to the area in the heap is placed into the stack.

##### 53. What is scope?

A scope is the range within a program for which an item is valid

##### 54. how does memory free happen in Rust?

When a variable goes out of scope, Rust calls a special method `drop`, it frees heep.
When we assign a completely new value to an existing variable, Rust will call drop and free the original value’s memory immediately.

##### 53. What happens when we assign a variable to another variable?

when one variable is assigned to another variable, a shallow copy of the first variable's value is created and bound to the second variable. If the variable's value includes a value or values ​​of dynamic types, i.e. types whose values ​​are stored on the heap, then the first variable becomes invalid and a reference to it further in the code causes a compilation error.

##### 54. What is Move?

when we assign a variable to another variable and the value of that variable is stored on the heap, a shallow copy is created, i.e. the stack data is copied, including pointers to the data on the heap, but the value on the heap is not copied, and rust marks the original variable as invalid, this process is called "Move" transfer ownership.

By by means of "Move" occurs transfer ownership.

##### 54. where in a code a variable is valid?

variable is valid from the point at which it’s declared until the end of the current scope or until it is assigned to another variable, if its value is stored on the heap

##### 55. What is ownership pattern?

assigning a value to another variable moves it. When a variable that includes data on the heap goes out of scope, the value will be cleaned up by drop unless ownership of the data has been moved to another variable.

##### 55 What do deep copy i.e. not only copy of stack data, bat heep data

we can use a method called `clone`

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {s1}, s2 = {s2}");
```

##### 56 what happens when we assign a variable whose value type implements the Copy trait, to another variable?

variables that use it do not move, but rather are trivially copied, making them still valid after assignment to another variable.

##### 57 what happens when we annotate a type with Copy if the type, or any of its parts, has implemented the Drop trait?

we’ll get a compile-time error

##### 58. What types implement the Copy trait?

A general rule: any group of simple scalar values can implement Copy, and nothing that requires allocation or is some form of resource can implement Copy. Here are some of the types that implement Copy:

- All the integer types, such as u32.
- The Boolean type, bool, with values true and false.
- All the floating-point types, such as f64.
- The character type, char.
- Tuples, if they only contain types that also implement Copy. For example, (i32, i32) implements Copy, but (i32, String) does not.

##### 59. What happen when we passing a value to a function?

Passing a variable to a function will move or copy, variable depending on the type of data bound to the variable, just as it happens with assignment

Returning values from function can also transfer ownership

#### References and Borrowing

##### 60. What is reference?

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

##### 61. why do we need to pass a reference and not a value?

By means passing reference we do not transfer Ownership. We can refer to some value without taking ownership of it. Because reference does not own value, the value it points to will not be dropped when the reference stops being used. When functions have references as parameters instead of the actual values, we won’t need to return the values in order to give back ownership, because we never had ownership.


```rust
fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
} // Here, s goes out of scope. But because it does not have ownership of what
  // it refers to, it is not dropped.
```

##### What is Borrowing?

creating a reference called borrowing

##### what happens if we try to modify something we’re borrowing? 

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

##### What needs to be done to create a mutable reference?

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

##### What is a reference’s scope

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

##### What restriction have a mutable references?

if you have a mutable reference to a value, you can have no other references to that value within the scope of the first reference.

##### What is a dangling pointer?

Dangling pointer—a pointer that references a location in memory that may have been given to someone else—by freeing some memory while preserving a pointer to that memory

##### How the problem of dangling pointer solved in Rust?

In Rust, by contrast, the compiler guarantees that references will never be dangling references: if you have a reference to some data, the compiler will ensure that the data will not go out of scope before the reference to the data does.

```rust
fn dangle() -> &String { // dangle returns a reference to a String

    let s = String::from("hello"); // s is a new String

    &s // we return a reference to the String, s
} // Here, s goes out of scope, and is dropped. Its memory goes away.
  // Danger!
```

##### Rules of References?

- At any given time, you can have either one mutable reference or any number of immutable references.
- References must always be valid.

#### The Slice Type

##### What is Slice?

Slice are reference a contiguous sequence of elements in a collection.

##### Does Slice have Ownership?

A slice is a kind of reference, so it does not have ownership.

##### What is String Slices?

A string slice is a reference to part of a String, and it looks like this:

```rust
    let s = String::from("hello world");

    let hello = &s[0..5];
    let world = &s[6..11];
```

##### How in Slice to start at index 0?

 drop the value before the two periods. In other words, these are equal:

```rust
let s = String::from("hello");

let slice = &s[0..2];
let slice = &s[..2];
```

##### How to go to the last index in slice?

drop the trailing number. That means these are equal:

```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[3..len];
let slice = &s[3..];
```

##### How to get all String in Slice?

drop both values to take a slice of the entire string. So these are equal:

```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[0..len];
let slice = &s[..];
```

##### How  rewrite first_word to return a slice?

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

##### What type string literal?

```rust
//string literal type - string slice
&str
```

##### How we can pass a String to string slice?

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

##### What is Struct?

A struct, or structure, is a custom data type that lets you package together and name multiple related values that make up a meaningful group.

#### 5.1 Defining and Instantiating Structs

##### What is the similarity structs and tuples?

that both hold multiple related values. Like tuples, the pieces of a struct can be different types.

##### What is the difference structs and tuples?

Unlike with tuples, in a struct you’ll name each piece of data so it’s clear what the values mean.

##### How are structures over tuples more flexible?

Unlike with tuples, in a struct you’ll name each piece of data so it’s clear what the values mean. Adding these names means that structs are more flexible than tuples: you don’t have to rely on the order of the data to specify or access the values of an instance.

##### How define Struct?

To define a struct, we enter the keyword struct and name the entire struct. A struct’s name should describe the significance of the pieces of data being grouped together. Then, inside curly brackets, we define the names and types of the pieces of data, which we call fields.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

##### What are Struct fields?

The Struct fields are names with data type that are defined inside curly brackets

##### How is defined Struct used?

after we’ve defined struct, we create an instance of that struct by specifying concrete values for each of the fields.

##### How we create instance of the struct?

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

##### In what order do we specify field when creating struct?

We don’t have to specify the fields in the same order in which we declared them in the struct. We specify field in any order.


##### How to get a specific value from a struct?

To get a specific value from a struct, we use dot notation

```rust
user1.email = String::from("anotheremail@example.com");
```

##### What is needed to be able to change the value of the Struct field?

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

##### What is 'field init shorthand' syntax?

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

##### What is 'struct update' syntax?

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

##### What is Tuple Structs?

Tuple structs have the added meaning the struct name provides but don’t have names associated with their fields; rather, they just have the types of the fields. Tuple structs are useful when you want to give the whole tuple a name and make the tuple a different type from other tuples, and when naming each field as in a regular struct would be verbose or redundant.

##### How define Tuple Struct?

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

##### What is Unit-Like Structs?

This is struct that don’t have any fields?

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

##### How define Unit-Like Struct?

we use the struct keyword, the name we want, and then a semicolon

##### What are Unit-Like Structs for?

Unit-like structs can be useful when you need to implement a trait on some type but don’t have any data that you want to store in the type itself

##### Is it possible to create a structure that stores references to data that someone else owned?

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

##### What means curly brackets in 'println!'?

the curly brackets tell println! to use formatting known as Display: output intended for direct end user consumption

##### How we can add printing an instance of Struct while we’re debugging our program and see the values for all its fields?

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

##### How we can implement Display or Debug trait in Struct?

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

##### What is difference between `println!` and `dbg!` macro

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

##### What other attributes are there besides 'derive'?

for more information, [see the “Attributes” section of the Rust Reference](https://doc.rust-lang.org/reference/attributes.html)?

#### 5.3 Method Syntax

##### What is a "Method"?

Methods are similar to functions: we declare them with the fn keyword and a name, they can have parameters and a return value, and they contain some code that’s run when the method is called from somewhere else. Unlike functions, methods are defined within the context of a struct (or an enum or a trait object), and their first parameter is always self, which represents the instance of the struct the method is being called on.

##### How to define a method?

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

##### What difference using `&self` `&mut self` and `self` in method?

In case using `&self` we pass inside reference and therefore can only read data from struct instance.

In case using `&mut self` we pass muted reference and therefore can modify instance. In this case we myst create struct instance with `let mut` keyword

In case using `self` we pass ownership (make move). This technique is usually used when the method transforms self into something else and you want to prevent the caller from using the original instance after the transformation.

##### Do we can use equal names for fields and methods in Struct?

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

##### How called all functions defined in Struct impl block? 

All functions defined within an impl block are called associated functions because they’re associated with the type named after the impl

##### Do can we create association function without self as first argument?

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

##### How do we call association function?

To call associated function, we use the `::` syntax with the struct name

```rust
 let sq = Rectangle::square(3);
```

is an example. This function is namespaced by the struct: the :: syntax is used for both associated functions and namespaces created by modules.

##### How many impl Blocks can do have Struct? 

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

##### What is enum used for?

Enums allow you to define a type by enumerating its possible variants. enums give you a way of saying a value is one of a possible set of values. For example, we may want to say that Rectangle is one of a set of possible shapes that also includes Circle and Triangle

#### 6.1 Defining an Enum

##### How define Enum?

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

##### what called enum instances?

enum variants

##### How can we get an enum variant?

We write enum name, two colons and instance name

```rust
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
```

##### Do can we used enum type as function parameter?

We can used enum type as any other type as function parameter

```rust
fn route(ip_kind: IpAddrKind) {}

route(IpAddrKind::V4);
route(IpAddrKind::V6);
```

##### How we can define method in enum?

This is being done as with struct: impl followed enum name and curly brackets whit method definition. The body of the method would use 'self' to get the value that we called the method on.

##### What is Null value?

Null value is value that currently invalid or absent for some reason.

##### How in Rust implementing Null value?

In rust Null value implemented by using `enum Option<T>`. This enum encode the concept of a value being present or absent.

```rust
enum Option<T> {
    None,
    Some(T),
}
```

`enum Option<T>` have two variant None - that represent absent value; and Some(T) - that represent present value some type T. This variants included in prelude thus its not need bring into scope explicitly

##### How do we can use Options variants?

```rust
    let some_number = Some(5);
    let some_char = Some('e');

    let absent_number: Option<i32> = None;
```

we can not annotate type of Some variable i.e. rust can infer in, can do with using None type

##### For what using `Options<T>` type?

you have to convert an `Option<T>` to a T before you can perform T operations with it. Generally, this helps catch one of the most common issues with null: assuming that something isn’t null when it actually is.

Eliminating the risk of incorrectly assuming a not-null value helps you to be more confident in your code. In order to have a value that can possibly be null, you must explicitly opt in by making the type of that value `Option<T>`. Then, when you use that value, you are required to explicitly handle the case when the value is null. Everywhere that a value has a type that isn’t an `Option<T>`, you can safely assume that the value isn’t null. This was a deliberate design decision for Rust to limit null’s pervasiveness and increase the safety of Rust code.

So how do you get the T value out of a Some variant when you have a value of type `Option<T>` so that you can use that value? The `Option<T>` enum has a large number of methods that are useful in a variety of situations; you can check them out in [its documentation](https://doc.rust-lang.org/std/option/enum.Option.html). Becoming familiar with the methods on `Option<T>` will be extremely useful in your journey with Rust.

#### 6.2 The match Control Flow Construct


##### What is `match`?

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

##### How `match` works?

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

#####  How to extract values out of enum variants? 

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

#####  How to extract values out of `Option<T>` enum? 

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

##### Do we match all possibilities in match expression?

the arms patterns must cover all possibilities. If aur match code do not cover all possibilities, this is a bug and it won't compile:

```rust
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            Some(i) => Some(i + 1),
        }
    } // error[E0004]: non-exhaustive patterns: `None` not covered
```

##### What are methods for match all possibilities in match expression?

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

##### What is difference between usage `other` and `_` keyword in `match`

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

##### What is `if let` control flow syntax?

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

##### What is Crate?

A crate is the smallest amount of code that the Rust compiler considers at a time. Even if you run rustc rather than cargo and pass a single source code file, the compiler considers that file to be a crate. Crates can contain modules, and the modules may be defined in other files that get compiled with the crate, as we’ll see in the coming sections.

##### What forms crates exists?

- binary crates
- library crates

##### What is Binary crates?

Binary crates are programs you can compile to an executable that you can run, such as a command-line program or a server. Each must have a function called main that defines what happens when the executable runs.

##### what is the distinctive feature Binary crates?

Binary crates must have a function called main that defines what happens when the executable runs.

##### What is Library crates?

Library crates define functionality intended to be shared with multiple projects, its don’t have a main function, and they don’t compile to an executable.

##### What is crate root?

The crate root is a source file that the Rust compiler starts from and makes up the root module of your crate.

##### What is package?

A package is a bundle of one or more crates that provides a set of functionality. A package contains a Cargo.toml file that describes how to build those crates.

##### How many crates can have package?

A package must contain at least one crate, whether that’s a library or binary crate.

##### How many library crates can have package?

only one library crate

##### How many binary crates can have package?

A package can contain as many binary crates as you like, but at most only one library crate. 

##### What is Cargo?

Cargo is actually a package that contains the binary crate for the command-line tool you’ve been using to build your code. The Cargo package also contains a library crate that the binary crate depends on. Other projects can depend on the Cargo library crate to use the same logic the Cargo command-line tool uses.

##### How create package?

`cargo new package-name`

##### what structure of package directory created 'cargo new'?

Cargo.toml, src/main.rs

##### How cargo understands what a package contain binary crate?

Cargo follows a convention that src/main.rs is the crate root of a binary crate with the same name as the package

##### How cargo understands what a package contain library crate?

Cargo knows that if the package directory contains src/lib.rs, the package contains a library crate with the same name as the package, and src/lib.rs is its crate root

##### How a package can have multiple binary crate?

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

##### What is first a compiler does when it compiles a crate?

When compiling a crate, the compiler first looks in the crate root file (usually src/lib.rs for a library crate or src/main.rs for a binary crate) for code to compile.

##### Where compiler look for module code for module declared in crate root, i.e. src/lib.rs or src/main.rs?

if we declare module, say `mod mod_name;`, the compiler  will look for the module’s code in these places:

- Inline, within curly brackets that replace the semicolon following `mod mod_name`
- In the file `src/mod_name.rs`
- In the file `src/mod_name/mod.rs`

##### Where compiler look for module code for module declared in any file other than crate root, i.e. code for submodule?

if we declare sub module, say `mod sub_mod_name;` in file `src/parent_mod.rs`, the compiler  will look for the sub module’s code in these places:

- Inline, directly following mod `mod sub_mod_name`, within curly brackets instead of the semicolon
- In the file `src/parent_mod/sub_mod_name.rs`
- In the file `src/parent_mod/sub_mod_name/mod.rs`

##### When and How we can refer to code in module?

- When - Module should be part of our crate
- How - if we have type `SomeType` in `src/parent_mod/sub_mod.rs` we cat refer to in as `crate::parent_mod::sub_mod::SomeType` if the privacy rules allow.

##### How to do within module public?

Code within a module is private from its parent modules by default. To make a module public, declare it with pub mod instead of mod. To make items within a public module public as well, use pub before their declarations.

##### For what is used `use` keyword?

Within a scope, the `use` keyword creates shortcuts to items to reduce repetition of long paths. In any scope that can refer to `crate::parent_mod::sub_mod::SomeType`, you can create a shortcut with `use crate::parent_mod::sub_mod::SomeType`; and from then on you only need to write `Asparagus` to make use of that type in the scope.

##### For what is used modules?

Modules let us organize code within a crate for readability and easy reuse. Modules also allow us to control the privacy of items because code within a module is private by default.

By using modules, we can group related definitions together and name why they’re related. Programmers using this code can navigate the code based on the groups rather than having to read through all the definitions, making it easier to find the definitions relevant to them. Programmers adding new functionality to this code would know where to place the code to keep the program organized.

##### For what is used private items?

Private items are internal implementation details not available for outside use. 

##### For what is make modules and the items within them public.

We can choose to make modules and the items within them public, which exposes them to allow external code to use and depend on them.

##### How we can create library crate?

`cargo new restaurant --lib`

##### How we can structure crate?

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

##### Why `src/main.rs` and `src/lib.rs` are called crate roots?

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

##### What is module tree?

module tree is crate’s module structure.
This tree shows how some of the modules nest inside other modules; for example, hosting nests inside front_of_house. The tree also shows that some modules are siblings, meaning they’re defined in the same module; hosting and serving are siblings defined within front_of_house. If module A is contained inside module B, we say that module A is the child of module B and that module B is the parent of module A. Notice that the entire module tree is rooted under the implicit module named crate.

##### What does means that some modules a *siblings*?

This means that this modules are defined in the same module

##### What does means that some module a child of other module?

 If module A is contained inside module B, we say that module A is the child of module B.

##### What does means that some module a parent of other module?

 If module A is contained inside module B, we say that module B is the parent of module A.

#### 7.3 Paths for Referring to an Item in the Module Tree

##### For what using Paths?

Paths used to show Rust where to find an item in module tree. To call a function, we need to know its path.

##### What forms does Path have?

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

##### What is absolute path?

An absolute path is the full path starting from a crate root; for code from an external crate, the absolute path begins with the crate name, and for code from the current crate, it starts with the literal `crate`.

Path are followed by one or more identifiers separated by double colons (`::`).

##### What is relative path?

A relative path starts from the current module and uses `self`, `super`, or `an` identifier in the current module.

Path are followed by one or more identifiers separated by double colons (`::`).

##### How to choose whether to use a relative or absolute path?

This is a decision you’ll make based on your project, and it depends on whether you’re more likely to move item definition code separately from or together with the code that uses the item.

For example, if we moved the front_of_house module and the eat_at_restaurant function into a module named customer_experience, we’d need to update the absolute path to add_to_waitlist, but the relative path would still be valid. However, if we moved the eat_at_restaurant function separately into a module named dining, the absolute path to the add_to_waitlist call would stay the same, but the relative path would need to be updated. 

Our preference in general is to specify absolute paths because it’s more likely we’ll want to move code definitions and item calls independently of each other.

##### What a items in Rust?

functions, methods, structs, enums, modules, and constants.

##### What is the default visibility of items in Rust

In Rust, all items (functions, methods, structs, enums, modules, and constants) are private to parent modules by default. Items in a parent module can’t use the private items inside child modules, but items in child modules can use the items in their ancestor modules.

##### Can child items use the items it their ancestor modules?

items in child modules can use the items in their ancestor modules, but items in a parent module can’t use the private items inside child modules. This is because child modules wrap and hide their implementation details, but the child modules can see the context in which they’re defined.

##### What make item private?

If you want to make an item like a function or struct private, you put it in a module.

##### How  to expose inner parts of child modules’ code?

Using the `pub` keyword to make an item public.

##### How to construct relative paths that begin in the parent module?

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

##### what are the default fields of a structure?

Private

##### How to create an struct instance from struct whit a private fields?

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

##### what are the default enum variants?

Public

##### How to make enum variants public?

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

##### Why use `use` keyword?

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

##### How do I make a name obtained with the "use" keyword available to code in another scope?

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

##### How to use External Packages?

We most specify package_name = package_version in Cargo.toml file as dependencies. This tells Cargo to download the package and any dependencies from crates.io and make it available to our project. Then we can use paths and `use` keyword to bring the crate API available to our code. If the crate is included in standard library we don't need specify it in Cargo.toml.

##### How we can bring multiple items defined in the same crate or same module into scope by using one line?

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

##### When we can use 'self' into 'use' statement?

if some paths have common part and this part is entirely one path we can merge these paths by using 'nested path' where in curly brackets common part is indicated as 'self'

```rust
// Filename: src/lib.rs
use std::io;
use std::io::Write;

// Filename: src/lib.rs

use std::io::{self, Write};
```

##### How we can brings all public items defined in path into scope?

We must specify that path followed by the * glob operator.

```rust
use std::collections::*;
```

#### Separating Modules into Different Files

##### How we can extract module defined in file to its own file?

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

##### How Rust package system allow you organize program code?

Rust lets you split a package into multiple crates and a crate into modules so you can refer to items defined in one module from another module. You can do this by specifying absolute or relative paths. These paths can be brought into scope with a use statement so you can use a shorter path for multiple uses of the item in that scope. Module code is private by default, but you can make definitions public by adding the pub keyword

### 8. Common Collections

<https://doc.rust-lang.org/std/collections/index.html>

##### How unique are collections compared to other types?

Most other data types represent one specific value, but collections can contain multiple values

##### What difference between collections and array and tuple?

Unlike the built-in array and tuple types, the data these collections point to is stored on the heap, which means the amount of data does not need to be known at compile time and can grow or shrink as the program runs.

##### What is Vector collection?

Vector is collection that allow to store a variable number of values next to each other.

##### What is String collection?

A string is a collection of characters

##### What is Hash Map collection?

A hash map allows you to associate a value with a specific key. It’s a particular implementation of the more general data structure called a map

#### 8.1 Storing Lists of Values with Vectors

Note: For more on the implementation details of the `Vec<T>` type, see “[The Rustonomicon](https://doc.rust-lang.org/nomicon/vec/vec.html)”

the API [documentation](https://doc.rust-lang.org/std/vec/struct.Vec.html) for all of the many useful methods defined on `Vec<T>` by the standard library


##### How create vector instance?

We can call 'Vec::new()' method and assign value to variable with annotated variable type, or call  'vec!' macro with pointing vector values and with this case we no need annotated variable type because Rust inferred it.

```rust
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3];
```

##### How update a Vector?

Vector variable must be defined as mutable and then we can used 'push' method to insert value to vector

```rust
 let mut v = Vec::new();

 v.push(5);
 v.push(6);
 v.push(7);
 v.push(8);
```

The numbers we place inside are all of type i32, and Rust infers this from the data, so we don’t need the `Vec<i32>` annotation

##### How we can to read Elements of Vectors?

We have two ways to reference a value stored in a vector.

- via indexing. In this case we indicate a vector variable with followed square brackets with value index inside. Index numbering starts from zero.
- by means `get` method. In this case as argument we pass to `get` method vector value index also. This method return `Option<&T>` type.

##### What is difference between reference vector value by index and by means `get` method?

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

##### In what cases did we used a reference to vector value by index?

This method is best used when you want your program to crash if there’s an attempt to access an element past the end of the vector.

```rust
    let v = vec![1, 2, 3, 4, 5];

    let does_not_exist = &v[100];
    let does_not_exist = v.get(100);
```

##### In what cases did we used a reference to vector value by means `get` method?

You would use this method if accessing an element beyond the range of the vector may happen occasionally under normal circumstances. Your code will then have logic to handle having either `Some(&element)` or `None`

##### Can we have immutable and mutable reference to vector value?

We can not have immutable and mutable reference to vector value in the same scope

```rust
    // not compile
    let mut v = vec![1, 2, 3, 4, 5];

    let first = &v[0]; // immutable borrow occurs here

    v.push(6); // mutable borrow occurs here

    println!("The first element is: {first}"); // immutable borrow later used here
```

##### How we can Iterating Over the immutable Values in a Vector?

We must use `for` loop with immutable reference to vector variable

```rust
    let v = vec![100, 32, 57];
    for i in &v {
        println!("{i}");
    }
```

##### How we can Iterating Over the mutable Values in a Vector?

We must use `for` loop with mutable reference to vector variable and use the * dereference operator to get to the value in i before we can use the += operator

```rust
    let v = vec![100, 32, 57];
    for i in &mut v {
        *i += 50;
    }
```

##### Can we modify the entire vector while iterating over the vector?

Iterating over a vector, whether immutably or mutably, is safe because of the borrow checker’s rules. If we attempted to insert or remove items in the for loop bodies we would get a compiler error. The reference to the vector that the for loop holds prevents simultaneous modification of the whole vector.


##### Can we store in vector values different types?

Vectors can only store values that are of the same type

##### How we can store in vector values different types?

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

##### In case of using a vector with enum values holds different types, how can we handle these values?

Using a `match` expression whit the exhaustive set of types.

##### Where vector API?

the API [documentation](https://doc.rust-lang.org/std/vec/struct.Vec.html) for all of the many useful methods defined on `Vec<T>` by the standard library

#### 8.2 Storing UTF-8 Encoded Text with Strings

##### What Is a String?

Rust has only one string type in the core language, which is the string slice str that is usually seen in its borrowed form &str. String literals, for example, are stored in the program’s binary and are therefore string slices.

The String type, which is provided by Rust’s standard library rather than coded into the core language, is a growable, mutable, owned, UTF-8 encoded string type. When Rustaceans refer to “strings” in Rust, they might be referring to either the String or the string slice &str types, not just one of those types.

##### How implemented String type?

String is implemented as a wrapper around a vector of bytes with some extra guarantees, restrictions, and capabilities

##### How create new String?

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

##### How update a String?

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

##### What happen when we perform String Concatenation with the + Operator?

the `+` Operator uses the `add` method by accepting first operand as first parameter, taking it ownership and second operand as second parameter as string slice (&str). When we instead &str passes into `add` function String reference (&String) Rust uses a `deref coercion`, which turns &String into &String[..] (&str). Next `add` takes ownership of first parameter, appends a copy of the contents of second parameters, and then returns ownership of the result. Because add does not take ownership of the second parameter, second parameter variable will still be a valid String after this operation unlike first parameter.

```rust
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used
    // fn add(self, s: &str) -> String {
```

##### How `format!` macro works?

The `format!` macro works like println!, but instead of printing the output to the screen, it returns a String with the contents. The code generated by the format! macro uses references so that this its call doesn’t take ownership of any of its parameters.

```rust
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");

    let s = format!("{s1}-{s2}-{s3}");
```

##### What is string `deref coercion`?

Many String methods accept as parameters string slice type (&str). When we pass it a &String type argument, Rust performs a type coercion - &String to &String[..] (&str), which is called `deref coercion`

##### Can we access parts of a String using indexing syntax?

If we try to index a String, we well get an error.

##### Why doesn't Rust allow you to index a string?

A string is a collection of chars. Rust uses UTF-8 to encode chars, and so each char can take up between one and four bytes. In Rust, a string is implemented as a byte vector, which is a collection of bytes, and when we index a String, we are referencing a single byte, which doesn't make sense in the context of a String.

##### Can we slicing a String?

We can slicing a String, but it is bad practice. Each char of String can take range up between one and four bytes, when we do slice we get reference to individual bytes, not whole characters and if we do not capture the entire byte range of the char, we will get a panic at runtime and program crash.

```rust
// this will crash

let hello = "Здравствуйте";

let s = &hello[0..1]; // byte index 1 is not a char boundary; it is inside 'З' (bytes 0..2) of `Здравствуйте`
```

##### How we can iterate over String by Char?

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

##### How we can iterate over String by Bytes?

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

##### What is Hash Maps?

The type HashMap<K, V> stores a mapping of keys of type K to values of type V using a hashing function, which determines how it places these keys and values into memory. 

##### What are Hash Maps used for?

Hash maps are useful when you want to look up data not by using an index, as you can with vectors, but by using a key that can be of any type.

##### How to create hash maps?

One way to create an empty hash `map` is to use new and to add elements with `insert`

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
```

##### How to access a value in Hash Map?

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

##### What type does the `get` method of Hash Map return?

Option<&V>

##### How we can iterate over each key–value pair in a hash map?

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

##### How Hash Map to process Ownership?

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

##### What happens if you insert a value into a hash map for an existing key?

Old value will be overwritten

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Blue"), 25);

    println!("{scores:?}"); //{"Blue": 25}
```

##### How insert a Key and Value Only If a Key Isn’t Present?

Hash maps have a special API for this called `entry` that takes the key you want to check as a parameter. The return value of the entry method is an enum called `Entry` that represents a value that might or might not exist. The `or_insert` method on `Entry` is defined to return a mutable reference to the value for the corresponding `Entry` key if that key exists, and if not, it inserts the parameter as the new value for this key and returns a mutable reference to the new value.

```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);

    scores.entry(String::from("Yellow")).or_insert(50);
    scores.entry(String::from("Blue")).or_insert(50);

    println!("{scores:?}"); // {"Yellow": 50, "Blue": 10}
```

##### How to Update a Value Based on the Old Value?

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

##### In what order does iteration occur in a hash map?

iterating over a hash map happens in an arbitrary order.

##### What hashing function used in Hash Map?

SipHash <https://en.wikipedia.org/wiki/SipHash>

### 9. Error Handling

##### What error categories exist in Rust?

Rust groups errors into two major categories: recoverable and unrecoverable errors. For a recoverable error, such as a file not found error, we most likely just want to report the problem to the user and retry the operation. Unrecoverable errors are always symptoms of bugs, such as trying to access a location beyond the end of an array, and so we want to immediately stop the program.

#### 9.1 Unrecoverable Errors with panic!

##### What is unrecoverable errors?

Unrecoverable errors are always symptoms of bugs, such as trying to access a location beyond the end of an array, and so we want to immediately stop the program.

##### What are alternative actions of Rust in case of panic?

- unwinding. Rust walks back up the stack and cleans up the data from each function it encounters. The default action.
- aborting, which ends the program without cleaning up. Memory that the program was using will then need to be cleaned up by the operating system

##### How and why switch from unwinding to aborting?

If in your project you need to make the resultant binary as small as possible, you can switch from unwinding to aborting upon a panic by adding panic = 'abort' to the appropriate `[profile]` sections in your Cargo.toml file

```toml
[profile.release]
panic = 'abort'
```

##### What ways to cause a panic in practice?

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

##### What actions does Rust take when panic occurs?

panics will print a failure message, unwind, clean up the stack, and quit

##### what is backtrace?

A backtrace is a list of all the functions that have been called to get to this point

##### How to read a backtrace?

To start from the top and read until you see files you wrote. That’s the spot where the problem originated. The lines above that spot are code that your code has called; the lines below are code that called your code. These before-and-after lines might include core Rust code, standard library code, or crates that you’re using

##### what settings are needed to print the backtrace?

 debug symbols must be enabled. Debug symbols are enabled by default when using `cargo build` or `cargo run` without the --release flag

#### 9.2 Recoverable Errors with Result

##### What is recoverable error?

For a recoverable error we most likely just want to report the problem to the user and retry the operation, for example file not found error.

##### How does Rust program handle recoverable error?

Functions or methods that may encounter a recoverable error must return enum Result type. The calling code must handle the various enum Result type `Ok` or `Err` variants.

##### What is enum Result type?

enum Result type is type that returned from function than can generated recoverable error. Enum Result type has two variants `Ok` and `Err` which are bound to  generic type parameters `T` and `E`. `T` represents the type of the value that will be returned in a success case within the Ok variant, and E represents the type of the error that will be returned in a failure case within the Err variant. Because Result has these generic type parameters, we can use the Result type and the functions defined on it in many different situations where the success value and error value we want to return may differ.

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

##### How recoverable error handled using Result type?

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

##### What is the result of the `unwrap()` method?

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

##### What is the result of the `expect()` method?

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

##### What is Propagating Errors?

If we get a variant of the `Err` Result inside our function, we can pass it on to the calling code to handle. This called Propagating Errors.

##### How we can Propagate Error?

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

##### What does the `?` operator?

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

##### What happen when `Err` Result value have called `?` operator?

`Err` Result value go through the `from` function, defined in the From trait in the standard library, which is used to convert values from one type into another. When the ? operator calls the `from` function, the error type received is converted into the error type defined in the return type of the current function. This is useful when a function returns one error type to represent all the ways a function might fail, even if parts might fail for many different reasons.

##### What does the `fs::read_to_string` function?

Reading a file into a string is a fairly common operation, so the standard library provides the convenient `fs::read_to_string` function that opens the file, creates a new String, reads the contents of the file, puts the contents into that String, and returns it in `Ok` Result or `Err` in case error.

```rust
use std::fs;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```

##### Can `?` operator automatically convert a Result to an Option or vice versa?

The ? operator won’t automatically convert a Result to an Option or vice versa; in those cases, you can use methods like the `ok` method on Result or the `ok_or` method on Option to do the conversion explicitly.

##### What type can the main function return?

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

##### when call panic! and when return Result?

When code panics, there’s no way to recover. You could call panic! for any error situation, whether there’s a possible way to recover or not, but then you’re making the decision that a situation is unrecoverable on behalf of the calling code. When you choose to return a Result value, you give the calling code options. The calling code could choose to attempt to recover in a way that’s appropriate for its situation, or it could decide that an Err value in this case is unrecoverable, so it can call panic! and turn your recoverable error into an unrecoverable one. Therefore, returning Result is a good default choice when you’re defining a function that might fail.

### 10 Generic Types, Traits, and Lifetimes

##### What are generics for?

For effectively handling code duplication. Functions can take parameters of some generic type, instead of a concrete type like i32 or String, in the same way they take parameters with unknown values to run the same code on multiple concrete values.

##### How to extract duplicate code?

1. Identify duplicate code.
2. Extract the duplicate code into the body of the function, and specify the inputs and return values of that code in the function signature.
3. Update the duplicate code locations to call the function instead.

#### 10.1 Generic Data Types

##### How to name type parameters?

To parameterize the types in a function, struct, enum we need to name the type parameters. We can use any identifier as a type parameter name following Rust’s type-naming convention that is UpperCamelCase. But, by convention, type parameter names in Rust are short, often just one letter.


##### How define function that uses generics?

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

##### What is parameter type Restriction?

In some situations where some operations are performed on generic type parameters, we must restrict generic types to only types that support those operations. This is done by annotating the generic type name definition in angle brackets with Traits that define those operations.

`fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T `


##### How define struct that uses generics?

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

##### How define enum that uses generics?

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

##### How define method that uses generics?

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

##### How we can specify constraints on generic types when defining methods on the type?

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

##### What is Monomorphization?

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

##### What is Trait for?

A trait defines the functionality a particular type has and can share with other types. We can use traits to define shared behavior in an abstract way. We can use trait bounds to specify that a generic type can be any type that has certain behavior.

##### What determines the behavior of a type?

The behavior of a type is defined by the set of methods we can call on that type.

##### When types shares the same behavior?

 Different types share the same behavior if we can call the same methods on all of those types.

#####  Hwo in Rust define a shared behavior?

Trait definitions are a way to group method signatures together to define a set of behaviors necessary to accomplish some purpose.

##### How define Trait?

We declare a trait using the trait keyword and then the trait’s name. We also must declare a trait as pub so that crates depending on this crate can make use of this trait too. Inside the curly brackets, we declare the method signatures that describe the behaviors of the types that implement this trait. After the method signature, instead of providing an implementation within curly brackets, we use a semicolon. 

```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String;
}
```

##### How a type implements a trait?

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

##### How should we use a types that implement a trait?

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

##### Can we implement external traits on external types?

we can’t implement external traits on external types. For example, we can’t implement the Display trait on Vec<T> within our aggregator crate because Display and Vec<T> are both defined in the standard library and aren’t local to our aggregator crate.

we can implement a trait on a type only if either the trait or the type, or both, are local to our crate.

##### Can a trait contain an implementation of the method it defines?

A trait can contain method whit implementation. This is called "Default Implementations"

```rust
// Filename: src/lib.rs
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

##### What happen if a type implement trait whit default implemented methods

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

##### Can default implemented trait methods call other methods of the trait?

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

##### How to call the default implementation from an overriding implementation of that same method?

it isn’t possible

##### How type of argument can accept function parameter annotated by trait type? 

This parameter can accepts any type that implements that trait.

##### What syntaxes used to define functions that accept many types?

- `impl Trait_name` syntax
- Trait Bound Syntax

##### How to use `impl trait_name` syntax to define functions that accept many different types?

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


##### How to use Trait Bound Syntax to define functions that accept many different types?

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

##### How to use Trait in defining a function's return type?

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

##### What can we Conditionally Implement Methods by Using Trait Bounds?

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

##### What is blanket implementations?

We can also conditionally implement a trait for any type that implements another trait. Implementations of a trait on any type that satisfies the trait bounds are called blanket implementations and are used extensively in the Rust standard library. For example, the standard library implements the ToString trait on any type that implements the Display trait. The impl block in the standard library looks similar to this code:

```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

#### 10.3 Validating References with Lifetimes

##### What is lifetime?

- as generic. Lifetime is kind of generic that ensure that references are valid as long as we need them to be.

- as property of reference. Every reference in Rust has a lifetime. Reference lifetime is program scope for which the reference is valid.

##### What is mean - reference is valid?

This means that the value referenced by this reference will not be dropped from memory due to going out of scope of the owner that value.

##### When we must annotate a Lifetime?

Most of the time, lifetimes are implicit and inferred, just like most of the time, types are inferred. We  must annotate lifetimes when the lifetimes of references could be related in a few different ways. Rust requires us to annotate the relationships using generic lifetime parameters to ensure the actual references used at runtime will definitely be valid.

##### What main aim of lifetimes?

The main aim of lifetimes is to prevent dangling references, which cause a program to reference data other than the data it’s intended to reference

##### What does Borrow Checker do?

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

##### What is mean when function return borrowed value (reference)?

This means that this borrowing comes from one of the function parameters.

##### When we must annotate return value of function by lifetime parameter?

If we define function that accept some borrows and return borrow and we do not definitely determine from what parameter  borrowed return value we must specify to compiler how determine lifetime of return borrow. This hint to the compiler is made using the lifetime parameter.

##### Can have  parameters of function different reference lifetime? 

functions can accept references with any lifetime by specifying a generic lifetime parameter.

##### What describe Lifetime annotations?

They describe the relationships of the lifetimes of multiple references to each other without affecting the lifetimes.

annotations are meant to tell Rust how generic lifetime parameters of multiple references relate to each other

##### What syntax have Lifetime annotation?

the names of lifetime parameters must start with an apostrophe (') and are usually all lowercase and very short, like generic types. Most people use the name 'a for the first lifetime annotation. We place lifetime parameter annotations after the & of a reference, using a space to separate the annotation from the reference’s type.

```rust
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

##### How to use lifetime annotations in function signatures?

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

##### What means  If the reference returned from function does not refer to one of the parameters?

Returned reference would be a dangling reference because the value will go out of scope at the end of the function.

##### How we can define struct whit field contained reference?

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

##### Can we specify lifetime parameters for every functions or structs that use references?

 In early versions (pre-1.0) of Rust every reference needed an explicit lifetime. In this time some pattern lifetime annotations programmed into the compiler’s code so the borrow checker could infer the lifetimes in these situations and wouldn’t need explicit annotations.

#####  What is lifetime elision rules?

Patterns programmed into Rust’s analysis of references for recognition lifetime annotations patterns.

##### What is Input lLifetimes?

Lifetimes on function or method parameters are called input lifetimes

##### What is Output Lifetimes?

 lifetimes on return values are called output lifetimes

##### How compiler analysis of references in context of recognition lifetime annotations patterns?

The compiler uses three rules to figure out the lifetimes of the references when there aren’t explicit annotations. The first rule applies to input lifetimes, and the second and third rules apply to output lifetimes. If the compiler gets to the end of the three rules and there are still references for which it can’t figure out lifetimes, the compiler will stop with an error. These rules apply to `fn` definitions as well as `impl` blocks.

The first rule is that the compiler assigns a lifetime parameter to each parameter that’s a reference. In other words, a function with one parameter gets one lifetime parameter: `fn foo<'a>(x: &'a i32);` a function with two parameters gets two separate lifetime parameters: `fn foo<'a, 'b>(x: &'a i32, y: &'b i32);` and so on.

The second rule is that, if there is exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters: `fn foo<'a>(x: &'a i32) -> &'a i32`.

The third rule is that, if there are multiple input lifetime parameters, but one of them is `&self` or `&mut self` because this is a method, the lifetime of self is assigned to all output lifetime parameters. This third rule makes methods much nicer to read and write because fewer symbols are necessary.

##### What annotate lifetime in Method Definitions?

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

##### What is Static Lifetime?

'static Lifetime denotes that the affected reference can live for the entire duration of the program

##### What Lifetime have string literal?

All string literals have the 'static lifetime, which we can annotate as follows:

```rust
let s: &'static str = "I have a static lifetime.";
```

The text of this string is stored directly in the program’s binary, which is always available. Therefore, the lifetime of all string literals is 'static.

##### How used Generic Type Parameters, Trait Bounds, and Lifetimes Together?

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

##### What is tests?

Tests are Rust functions that verify that the non-test code is functioning in the expected manner.

##### What perform body of test function?

The bodies of test functions typically perform these three actions:

- Set up any needed data or state.
- Run the code you want to test.
- Assert that the results are what you expect.

##### What is Attribute

 Attributes are metadata about pieces of Rust code

##### How from function make test function?

To change a function into a test function, add `#[test]` attribute annotation on the line before `fn`

##### How we run tests?

we run tests by the `cargo test` command

##### What happen when we run tests with the cargo test command?

Rust builds a test runner binary that runs the annotated functions and reports on whether each test function passes or fails.

##### What happen in testing context when we make a new library project with Cargo?

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

##### Can we have a non-test function in a test module?

We might have non-test functions in the tests module to help set up common scenarios or perform common operations, so we always need to indicate which functions are tests.

[Ignoring Some Tests Unless Specifically Requested](https://doc.rust-lang.org/book/ch11-02-running-tests.html#ignoring-some-tests-unless-specifically-requested)

[See the documentation about benchmark tests ](https://doc.rust-lang.org/unstable-book/library-features/test.html)

[Documentation Comments as Tests](https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html#documentation-comments-as-tests)

##### When tests fail?

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

##### What is the `assert!` macro used for?

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

##### What is the `assert_eq!` and `assert_ne!` Macros used for?

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

##### How to add custom  Custom Failure Messages?

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

##### How we can test that our code handles error conditions as we expect?

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

##### What needs to be done to make `should_panic` tests more precise?

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

##### How we can use Result type for testing our code?

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

##### How default behavior of the binary produced by `cargo test`?

Run all the tests in parallel and capture output generated during test runs, preventing the output from being displayed and making it easier to read the output related to the test results.

##### How to change default `cargo test` behavior?

Specify command line options to change this default behavior.

##### How to separate command line options go to cargo test, and those that go to the resultant test binary

To separate these two types of arguments, you list the arguments that go to cargo test followed by the separator `--` and then the ones that go to the test binary. Running `cargo test --help` displays the options you can use with cargo test, and running `cargo test -- --help` displays the options you can use after the separator. Those options are also documented in the [“Tests” section](https://doc.rust-lang.org/rustc/tests/index.html) of the the [rustc book](https://doc.rust-lang.org/rustc/index.html).

##### How by default Cargo run test?

by default they run in parallel using threads, meaning they finish running faster and you get feedback quicker

By default, if a test passes, Rust’s test library captures anything printed to standard output. For example, if we call println! in a test and the test passes, we won’t see the println! output in the terminal; we’ll see only the line that indicates the test passed. If a test fails, we’ll see whatever was printed to standard output with the rest of the failure message.

##### How to run tests consistently?

you can send the `--test-threads` flag and the number of threads you want to use to the test binary.

```sh
$ cargo test -- --test-threads=1
```

##### What we should do if wont to see printed values for passing tests?

we can tell Rust to also show the output of successful tests with `--show-output`:

```sh
$ cargo test -- --show-output
```

##### How we can Running Single Tests?

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

##### How to Filtering to Run Multiple Tests?

We can specify part of a test name, and any test whose name matches that value will be run. For example, because two of our tests’ names contain `add`, we can run those two by running 

```sh
cargo test add
```

This command ran all tests with add in the name and filtered out the test named one_hundred. Also note that the module in which a test appears becomes part of the test’s name, so we can run all the tests in a module by filtering on the module’s name.

##### How to Ignoring Some Tests?

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

##### How we can run only tests marked as `ignored`?

we can use cargo test `-- --ignored`

```sh
cargo test -- --ignored
```

##### How we can run all tests include marked as `ignored`?

you can run `cargo test -- --include-ignored`

#### 11.3 Test Organization

##### What purpose of unit tests?

The purpose of unit tests is to test each unit of code in isolation from the rest of the code to quickly pinpoint where code is and isn’t working as expected.

##### What convention fo organization unit tests?

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

##### How role of `#[cfg(test)]` annotation?

The `#[cfg(test)]` annotation on the tests module tells Rust to compile and run the test code only when you run cargo test, not when you run cargo build.

##### Should to test Private Functions?

There’s debate within the testing community about whether or not private functions should be tested directly, and other languages make it difficult or impossible to test private functions.

##### Does allow Rust to test of Private Function?

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

##### What is purpose of integration tests?

to test whether many parts of your library work together correctly. In Rust, integration tests are entirely external to your library. They use your library in the same way any other code would, which means they can only call functions that are part of your library’s public API. 

##### Where are located integration tests?

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

##### How many files whit integration tests we can create?

We can make as many test files as we want

##### How Cargo compile files whit integration tests?

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

##### Should we annotate any code in integration tests with `#[cfg(test)]`?

We don’t need to annotate any code in tests/integration_test.rs with `#[cfg(test)]`. Cargo treats the tests directory specially and compiles files in this directory only when we run `cargo test`. Run cargo test now:

```rust
$ cargo test
```

##### How we can run a particular integration test function?

We can run a particular integration test function by specifying the test function’s name as an argument to `cargo test`

```sh
cargo test it_adds_two
```

##### How we can run all function in particular integration test file?

To run all the tests in a particular integration test file, use the `--test` argument of `cargo test` followed by the name of the file:

```sh
$ cargo test --test integration_test
```

##### How we can make shared code for integrated tests?

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

##### How can we make integration testing of binary crates?

If our project is a binary crate that only contains a src/main.rs file and doesn’t have a src/lib.rs file, we can’t create integration tests in the tests directory and bring functions defined in the src/main.rs file into scope with a use statement. Only library crates expose functions that other crates can use; binary crates are meant to be run on their own.

This is one of the reasons Rust projects that provide a binary have a straightforward src/main.rs file that calls logic that lives in the src/lib.rs file. Using that structure, integration tests can test the library crate with use to make the important functionality available. If the important functionality works, the small amount of code in the src/main.rs file will work as well, and that small amount of code doesn’t need to be tested.

### 12 An I/O Project: Building a Command Line Program

#### 12.1 Accepting Command Line Arguments

##### How we can pass command line arguments our program when running `cargo run`?

two hyphens to indicate the following arguments are for our program rather than for `cargo`, a string to search for, and a path to a file to search in

```sh
$ cargo run -- searchstring example-filename.txt
```

##### Where we can look for existing libraries for our needs?

Some existing libraries on crates.io can help with writing a programs.

##### Which Rust standard library function can we use to read the values ​​of command line arguments?

`std::env::args` function. This function returns an iterator of the command line arguments passed to program.

```rust
// Filename: src/main.rs
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(args);
}
```

##### What does the `args().collect()` method do?

This function returns an iterator of the command line arguments passed to program.

#### 12.2 Reading a File

##### How we can read file to string?

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

##### Why refactor?

As our program grows, the number of separate tasks the main function handles will increase. As a function gains responsibilities, it becomes more difficult to reason about, harder to test, and harder to change without breaking one of its parts. It’s best to separate functionality so each function is responsible for one task.

##### What is main Rust pattern about separating concerns?

main.rs handles running the program and lib.rs handles all the logic of the task at hand. Because you can’t test the main function directly, this structure lets you test all of your program’s logic by moving it into functions in lib.rs. The code that remains in main.rs will be small enough to verify its correctness by reading it.

##### How we can do refactoring?

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

##### What is TDD?

TDD is an acronym for Test-Driven Development. This is concept of write software  of writing the test before you write the code. The test-driven development (TDD) process with the following steps:

1. Write a test that fails and run it to make sure it fails for the reason you expect.
2. Write or modify just enough code to make the new test pass.
3. Refactor the code you just added or changed and make sure the tests continue to pass.
4. Repeat from step 1!

##### How Write a Failing Test?

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

##### How write code to pass the test?

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

##### Hwo Using the search Function in the run Function?

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



##### What module contain features for dealing with environment variable?

`std::env`

Docs

<https://doc.rust-lang.org/std/env/index.html>


#### 12.6 Writing Error Messages to Standard Error Instead of Standard Output

##### How make what our program print error massages to Standard Error Instead of Standard Output?

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

##### What is Closures?

Rust’s closures are anonymous functions you can save in a variable or pass as arguments to other functions. You can create the closure in one place and then call the closure elsewhere to evaluate it in a different context. Unlike functions, closures can capture values from the scope in which they’re defined.

##### Should we annotate the types of the parameters or return value of Closures?

Closures don’t usually require you to annotate the types of the parameters or the return value like fn functions do

##### Why we do not require annotate the types of the parameters or return value of Closures?

Type annotations are required on functions because the types are part of an explicit interface exposed to your users. Defining this interface rigidly is important for ensuring that everyone agrees on what types of values a function uses and returns. Closures, on the other hand, aren’t used in an exposed interface like this: they’re stored in variables and used without naming them and exposing them to users of our library.

Closures are typically short and relevant only within a narrow context rather than in any arbitrary scenario. Within these limited contexts, the compiler can infer the types of the parameters and the return type, similar to how it’s able to infer the types of most variables (there are rare cases where the compiler needs closure type annotations too).

##### Can we annotate the types of the parameters or return value of Closures?

As with variables, we can add type annotations if we want to increase explicitness and clarity at the cost of being more verbose than is strictly necessary.

```rust
Filename: src/main.rs
    let expensive_closure = |num: u32| -> u32 {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };
```

##### How define Closure?

```rust
fn  add_one_v1   (x: u32) -> u32 { x + 1 } // function
let add_one_v2 = |x: u32| -> u32 { x + 1 }; // a fully annotated closure definition.
let add_one_v3 = |x|             { x + 1 }; // remove the type annotations from the closure definition.
let add_one_v4 = |x|               x + 1  ; // remove the brackets, which are optional because the closure body has only one expression
```

##### What compiler determine parameters and return types of Closure?

For closure definitions, the compiler will infer one concrete type for each of their parameters and for their return value at compile time the first time the closure is used. Further usage Closure whit different types will result in compile error.

```rust
// Filename: src/main.rs
// This code does not compile!

    let example_closure = |x| x;

    let s = example_closure(String::from("hello"));
    let n = example_closure(5); // error
```

##### How Closure capture environment values?

Closures can capture values from their environment in three ways, which directly map to the three ways a function can take a parameter:

- borrowing immutably,
- borrowing mutably,
- taking ownership.

##### How does Closure determine what capture methods to use?

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

##### What we should do whit ownership when passing a closure to a new thread?

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

##### What closure body can do whit captured value?

- move a captured value out of the closure
- mutate the captured value,
- neither move nor mutate the value, 
- capture nothing from the environment to begin with.

##### What does it depend the way a closure captures and handles values from the environment?

How a closure captures and processes values ​​from the environment depends on what traits the closure implements. And accordingly, the trait that implement closures are what kinds of closures functions and struct can use.

##### What does it depend what kinds of closures can use functions and struct?

What kinds of closures can use functions and struct depends on what traits the closure implements.

##### Must we declare which traits must implement the closure?

Closures will automatically implement one, two, or all three of `Fn` traits, in an additive fashion, depending on how the closure’s body handles the values.

##### Which traits can implement closure?

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

##### Which trait must implement closure that moves captured values out of its body?

A closure that moves captured values out of its body will only implement `FnOnce` and none of the other `Fn` traits, because it can only be called once.

##### Which trait must implement closure that don’t move captured values out of their body, but that might mutate the captured values?

`FnMut` applies to closures that don’t move captured values out of their body, but that might mutate the captured values. These closures can be called more than once.

##### Which trait must implement closure that don’t move captured values out of their body and that don’t mutate captured values, as well as capture nothing from their environment?

`Fn` applies to closures that don’t move captured values out of their body and that don’t mutate captured values, as well as closures that capture nothing from their environment. These closures can be called more than once without mutating their environment, which is important in cases such as calling a closure multiple times concurrently.

#### 13.2 Processing a Series of Items with Iterators

##### What is the iterator pattern used for?

The iterator pattern allows you to perform some task on a sequence of items in turn. An iterator is responsible for the logic of iterating over each item and determining when the sequence has finished.

##### What is means - iterators are lazy?

In Rust, iterators are lazy, meaning they have no effect until you call methods that consume the iterator to use it up.

##### What is Iterator in Rust?

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


##### What method define Iterator Trait?

`fn next(&mut self) -> Option<Self::Item>;`

##### How can we get immutable references to values ​​in vector using iterator syntax?

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

##### How can we get mutable references to values ​​in vector using iterator syntax?

we must get mutable reference `mut_ref` from vector value by using `vec_var.iter_mut()` and then using it by call method `mut_ref.next()`

##### How can we get ownership of vector type and returns owned values using iterator syntax?

we can call `into_iter` instead of `iter` on the vector value

##### What is 'consuming adapters' methods?

The Iterator trait has a number of different methods with default implementations provided by the standard library. Some of these methods use the `next` method, these are called 'consuming adapters' because their call uses the iterator. For example `sum` method.

##### How the `sum` Iterator method works

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

##### What is 'Iterator adapters' methods?

Iterator adapters are methods defined on the Iterator trait that don’t consume the iterator. Instead, they produce different iterators by changing some aspect of the original iterator. For example `map` method

##### How the `map` Iterator method works?

method `map` are 'Iterator adapter' it takes a closure to call on each item as the items are iterated through. The `map` method returns a new iterator that produces the modified items. The closure here creates a new iterator in which each item from the vector will be incremented by 1

```rust
    #[test]
    fn iter_map() {
        let v = vec![1, 2, 3, 4, 5];

        let result: Vec<i32> = v.iter().map(|x| x + 1).collect();

        assert!(result == vec![2, 3, 4, 5, 6]);
    }
```

##### How we must combine 'Iterator adapters' and 'consuming adapters' method?

You can chain multiple calls to 'iterator adapters' to perform complex actions in a readable way. But because all iterators are lazy, you have to call one of the consuming adapter methods to get results from calls to iterator adapters.

##### Can we Using Closures that Capture Their Environment in iterators?

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

##### How the `filter` Iterator method works?

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

##### What code implementation faster on: `for loop` or Iterators?

iterators, although a high-level abstraction, get compiled down to roughly the same code as if you’d written the lower-level code yourself. Iterators are one of Rust’s zero-cost abstractions, by which we mean using the abstraction imposes no additional runtime overhead.
The implementations of closures and iterators are such that runtime performance is not affected.

##### What is 'zero-cost abstractions'?

This mean using the abstraction imposes no additional runtime overhead

### 14 More About Cargo and Crates.io

full explanation of all Cargo features, see its [documentation](https://doc.rust-lang.org/cargo/).

#### 14.1 Customizing Builds with Release Profiles

For the full list of configuration options and defaults for each profile, see Cargo’s [documentation](https://doc.rust-lang.org/cargo/reference/profiles.html).

##### What is 'release profiles'?

In Rust, release profiles are predefined and customizable profiles with different configurations that allow a programmer to have more control over various options for compiling code.

##### What release profiles exist?

- the `dev` profile Cargo uses when you run `cargo build`. The `dev` profile is defined with good defaults for development
- the `release` profile Cargo uses when you run `cargo build --release`. the release profile has good defaults for release builds.
- `test`
- `bench`

##### What happen if we add `[profile.*]` sections for any profile?

Cargo has default settings for each of the profiles that apply when you haven’t explicitly added any `[profile.*]` sections in the project’s Cargo.toml file. By adding `[profile.*]` sections for any profile you want to customize, you override any subset of the default settings.

```toml
# Filename: Cargo.toml

[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
```

##### What controls the `opt-level` profile setting? 

The `opt-level` setting controls the number of optimizations Rust will apply to your code, with a range of 0 to 3. Applying more optimizations extends compiling time, so if you’re in development and compiling your code often, you’ll want fewer optimizations to compile faster even if the resulting code runs slower. The default opt-level for dev is therefore 0. When you’re ready to release your code, it’s best to spend more time compiling. You’ll only compile in release mode once, but you’ll run the compiled program many times, so release mode trades longer compile time for code that runs faster. That is why the default opt-level for the release profile is 3.

#### 14.2 Publishing a Crate to Crates.io

##### what are documentation comments for?

they will generate HTML documentation. HTML displays the contents of documentation comments for public API elements, intended for programmers interested in how to use your container, rather than how it is implemented.

##### how are documentation comments pointed?

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

##### what markup can be used in documentation comments?

Markdown

##### what sections can be used in documentation?

- **Examples**
- **Panics**: The scenarios in which the function being documented could panic. Callers of the function who don’t want their programs to panic should make sure they don’t call the function in these situations.
- **Errors**: If the function returns a Result, describing the kinds of errors that might occur and what conditions might cause those errors to be returned can be helpful to callers so they can write code to handle the different kinds of errors in different ways.
- **Safety**: If the function is unsafe to call (we discuss unsafety in Chapter 20), there should be a section explaining why the function is unsafe and covering the invariants that the function expects callers to uphold.

##### How we can tests code in documentation comments?

We must add Example section of 'documentation comments' and inside this section, using markdown syntax, write code that can be used as test.  If we run cargo test with the documentation we will see the section Doc-tests in the test results.
Now if we change either the function or the example so the assert_eq! in the example panics and run cargo test again, we’ll see that the doc tests catch that the example and the code are out of sync with each other!

##### how to create a doc comment that does not refer to a specific code?

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

##### How to remove the internal organization from the public AP?

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

##### How to Setting Up a Crates.io Account?

- visit the home page at crates.io
- log in via a GitHub account.
- visit your account settings at https://crates.io/me/ and retrieve your API key. - run the cargo login command
- paste your API key when prompted

```sh
$ cargo login
abcdefghijklmnopqrstuvwxyz012345
```

This command will inform Cargo of your API token and store it locally in `~/.cargo/`credentials. Note that this token is a secret: do not share it with anyone else. If you do share it with anyone for any reason, you should revoke it and generate a new token on crates.io.

##### How to Publishing a Crate to Crates.io?

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

##### How Publishing a New Version of an Existing Crate?

change the version value specified in your Cargo.toml file and republish

##### what are the versification rules,

Use the [Semantic Versioning rules](http://semver.org/)

##### How to prevent any future projects from adding Deprecating Crate Versions as a new dependency?

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

##### What is 'yanking a crate version'?

Although you can’t remove previous versions of a crate, you can prevent any future projects from adding them as a new dependency. This is useful when a crate version is broken for one reason or another. In such situations, Cargo supports yanking a crate version.
Yanking a version prevents new projects from depending on that version while allowing all existing projects that depend on it to continue. Essentially, a yank means that all projects with a Cargo.lock will not break, and any future Cargo.lock files generated will not use the yanked version.

#### 14.3 Cargo Workspaces

##### What is Cargo Workspace?

As your project develops, you might find that the library crate continues to get bigger and you want to split your package further into multiple library crates. Cargo offers a feature called workspaces that can help manage multiple related packages that are developed in tandem.
A workspace is a set of packages that share the same Cargo.lock and output directory.

##### How to create a Workspace?

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

##### How to create package in Workspace?

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

##### What we can build Workspace?

We can build a workspace by running `cargo build` command in top-level Workspace dir

##### Which file and directories does `cargo build` create in Workspace?

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

##### How many packages we can create in Workspace?

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

##### What files and directories shares all packages in Workspace?

All packages in workspace shares `Cargo.lock` file and `target` directory.

##### What should we do if our container code depends on code from another Workspace package?

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

##### How we should run binary crate in Workspace?

To run a binary crate in Workspace, we should specify which package in the workspace we want to run by using the `-p` argument and the package name with `cargo run`:

```sh
$ cargo run -p adder
```

##### How we should add dependencies in Workspace packages?

We should add the dependency to the Cargo.toml file of each package where this dependency is required.

```toml
# Filename: add_one/Cargo.toml

[dependencies]
rand = "0.8.5"
```

##### Where located Cargo.lock file of Workspace package?

Workspace has only one Cargo.lock file at the top level, rather than having a Cargo.lock in each crate’s directory. This ensures that all crates are using the same version of all dependencies.

##### What happen If crates in the workspace specify incompatible versions of the same dependency?

Cargo will resolve each of them, but will still try to resolve as few versions as possible.

##### How we can run tests in Workspace?

If we call `cargo test` command  in top-level Workspace dir - cargo execute test in all Workspace packages. We can add `-p` flag whit name of a package - in this case cargo execute only tests specified package.

##### How we should publish Workspace crate?

If we wont publish Workspace crates to crates.io, we should each crate in the workspace publish separately. We can publish a particular crate in our workspace by using the `-p` flag and specifying the name of the crate we want to publish.

#### 14.5 Installing Binaries with cargo install

##### For what used `cargo install` command?

The cargo install command allows you to install and use binary crates locally. This isn’t intended to replace system packages; it’s meant to be a convenient way for Rust developers to install tools that others have shared on crates.io. Note that you can only install packages that have binary targets.

##### How we can install a binary cartes locally?

The cargo install command allows you to install and use binary crates locally.

##### What is 'binary target'?

A binary target is the runnable program that is created if the crate has a src/main.rs file or another file specified as a binary, as opposed to a library target that isn’t runnable on its own but is suitable for including within other programs

##### Where is information about crate target?

Usually, crates have information in the README file about whether a crate is a library, has a binary target, or both.

##### Where are a binaries installed with `cargo install` stored?

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

##### How we can extend Cargo with new subcommands without having to modify Cargo?

We can use `cargo install` to install extensions and then run them just like the built-in Cargo tools. If a binary in our $PATH is named `cargo-something`, you can run it as if it was a Cargo subcommand by running `cargo something`. Custom commands like this are also listed when you run `cargo --list`.

### 15 Smart Pointers.

##### What is a Pointer?

A pointer is a general concept for a variable that contains an address in memory. This address refers to, or “points at,” some other data.

##### How Pointers implemented in Rust?

The most common kind of pointer in Rust is a reference. References are indicated by the & symbol and borrow the value they point to. They don’t have any special capabilities other than referring to data, and have no overhead.

##### What is 'Smart Pointers'?

Smart pointers, on the other hand, are data structures that act like a pointer but also have additional metadata and capabilities. Rust, with its concept of ownership and borrowing, has an additional difference between references and smart pointers: while references only borrow data, in many cases, smart pointers own the data they point to.

##### How Smart Pointers implemented in Rust?

Smart pointers are usually implemented using structs. Unlike an ordinary struct, smart pointers implement the `Deref` and `Drop` traits.

##### What role `Deref` trait in Smart pointers?

The Deref trait allows an instance of the smart pointer struct to behave like a reference so you can write your code to work with either references or smart pointers. 

##### What role `Drop` trait in Smart pointers?

The Drop trait allows you to customize the code that’s run when an instance of the smart pointer goes out of scope.

#### 15.1 Using `Box<T>` to Point to Data on the Heap

##### What is `Box<T>` type?

The `Box<T>` type is a smart pointer because it implements the Deref trait, which allows `Box<T>` values to be treated like references. When a `Box<T>` value goes out of scope, the heap data that the box is pointing to is cleaned up as well because of the Drop trait implementation. Boxes allow you to store data on the heap rather than the stack.

##### Why use `Box<T>`?

Boxes allow you to store data on the heap rather than the stack. What remains on the stack is the pointer to the heap data. Refer Boxes don’t have performance overhead, other than storing their data on the heap instead of on the stack. But they don’t have many extra capabilities either.

- When you have a type whose size can’t be known at compile time and you want to use a value of that type in a context that requires an exact size
- When you have a large amount of data and you want to transfer ownership but ensure the data won’t be copied when you do so
- When you want to own a value and you care only that it’s a type that implements a particular trait rather than being of a specific type

##### How define Box value?

We define a variable to have the value of a Box that point to the some value, which is located on the heap.

```rust
// Filename: src/main.rs
fn main() {
    let b = Box::new(5);
    println!("b = {b}");
}
```

##### What is recursive type?

A value of recursive type can have another value of the same type as part of itself.

##### Why Recursive types pose an issue?

At compile time Rust needs to know how much space a type takes up. However, the nesting of values of recursive types could theoretically continue infinitely, so Rust can’t know how much space the value needs.

##### How does Box solve issue of Recursive types?

nesting of values of recursive types could theoretically continue infinitely, so Rust can’t know how much space the value needs. Because boxes have a known size, we can enable recursive types by inserting a box in the recursive type definition.

##### What is Cons List?

A cons list is a data structure that comes from the Lisp programming language and is made up of nested pairs. Each item in a cons list contains two elements: the value of the current item and the next item. The last item in the list contains only a value called Nil without a next item.

For example, here’s a pseudocode representation of a cons list containing the list 1, 2, 3 with each pair in parentheses:

(1, (2, (3, Nil)))

##### How Rust determine how much space to allocate for a Enum?

Rust goes through each variant of the Enum to see which variant requires more space. Rust will use the larger size to store the Enum variants.

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

##### How to define Cons List by using Enum?

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

##### What is Dereference operator?

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

##### What types can we apply the dereference operator to?

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

##### How Rust dereference Deref implementing types?

Rust substitutes the `*` operator with a call to the `deref` method and then a plain dereference so we don’t have to think about whether or not we need to call the deref method. This Rust feature lets us write code that functions identically whether we have a regular reference or a type that implements Deref.

```rust
fn main() {
    let y = Box::new(5);
    
    assert_eq!(5, *y); // *(y.deref())
}
```

##### Whether the '*' operator is applied recursively to values ​​returned from the `deref` method?

the `*` operator is replaced with a call to the `deref` method and then a call to the `*` operator just once, each time we use a `*` in our code. Substitution of the `*` operator does not recurse infinitely.

##### What is 'Deref coercion'?

Deref coercion is conversion a reference to a type that implements the Deref trait into a reference to another type. For example, deref coercion can convert &String to &str because String implements the Deref trait such that it returns &str.

##### Where used 'Deref coercion'?

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

##### How we can override `*` operator on mutable reference?

We should implement DerefMut trait on type that value we are using whit the mut reference.

##### What result type of Deref Coercion for &T?

&U when &T: Deref<Target=U>

##### What result type of Deref Coercion for mut& T?

- &mut U if T: DerefMut<Target=U>
- &U if T: Deref<Target=U>

#### 15.3 Running Code on Cleanup with the Drop Trait

##### For what to use Drop Trait?

Drop Trait lets you customize what happens when a value is about to go out of scope. You can provide an implementation for the Drop trait on any type, and that code can be used to release resources like files or network connections. You specify the code to run when a value goes out of scope by implementing the Drop trait.

##### what is required to implement Drop trait?

The Drop trait requires you to implement one method named `drop` that takes a mutable reference to `self`.

##### How is the `drop` method of the Drop feature called?

Rust automatically called `drop` for us when our instances went out of scope, calling the code we specified in.

##### How can we manually drop a value?

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

##### when a single value might have multiple owners?

 For example, in graph data structures, multiple edges might point to the same node, and that node is conceptually owned by all of the edges that point to it. A node shouldn’t be cleaned up unless it doesn’t have any edges pointing to it and so has no owners.

##### How we can enable multiple ownership?

You have to enable multiple ownership explicitly by using the Rust type `Rc<T>`, which is an abbreviation for reference counting.

##### What does `Rc<T>` type?

The `Rc<T>` type keeps track of the number of references to a value to determine whether or not the value is still in use. If there are zero references to a value, the value can be cleaned up without any references becoming invalid.

##### Can we use `Rc<T>` in multi-threaded scenarios?

We can use `Rc<T>` only in single-threaded scenarios

##### How we can use `Rc<T>` to Share Data?

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

##### What is 'Interior mutability'?

Interior mutability is a design pattern in Rust that allows you to mutate data even when there are immutable references to that data; normally, this action is disallowed by the borrowing rules.
Mutating the value inside an immutable value is the interior mutability pattern.

##### How implemented the Interior mutability pattern?

To mutate data, the pattern uses unsafe code inside a data structure to bend Rust’s usual rules that govern mutation and borrowing.

##### What is 'unsafe code'?

Unsafe code indicates to the compiler that we’re checking the rules manually instead of relying on the compiler to check them for us

##### When can we use Interior mutability pattern?

We can use types that use the interior mutability pattern only when we can ensure that the borrowing rules will be followed at runtime, even though the compiler can’t guarantee that. The unsafe code involved is then wrapped in a safe API, and the outer type is still immutable.

##### What difference between references, `Box<T>` and `RefCell<T>`?

With references and `Box<T>`, the borrowing rules’ invariants are enforced at compile time. With `RefCell<T>`, these invariants are enforced at runtime. With references, if you break these rules, you’ll get a compiler error. With `RefCell<T>`, if you break these rules, your program will panic and exit.

##### What could be the advantage of checking the borrowing rules at runtime?

The advantage of checking the borrowing rules at runtime is that certain memory-safe scenarios are then allowed, where they would’ve been disallowed by the compile-time checks. Static analysis, like the Rust compiler, is inherently conservative. Some properties of code are impossible to detect by analyzing the code.

##### When the `RefCell<T>` type is useful?

The `RefCell<T>` type is useful when you’re sure your code follows the borrowing rules but the compiler is unable to understand and guarantee that. `RefCell<T>` allows mutable borrows checked at runtime, you can mutate the value inside the `RefCell<T>` even when the `RefCell<T>` is immutable.

##### Can we use `RefCell<T>` type in multi-thread scenarios?

Similar to `Rc<T>`, `RefCell<T>` is only for use in single-threaded scenarios and will give you a compile-time error if you try using it in a multithreaded context.

##### How we can use `RefCell<T>` type to mutate immutable value.

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

##### How `RefCell<T>` keeping Track of Borrows at Runtime?

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

##### How get a value that can have multiple owners and that we can mutate?

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

##### what is the thread-safe version of `RefCell<T>`?

`RefCell<T>` does not work for multithreaded code! `Mutex<T>` is the thread-safe version of `RefCell<T>`

#### 15.6 Reference Cycles Can Leak Memory


