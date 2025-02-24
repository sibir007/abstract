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

#### How bringing two items with the same name into scope with use statements?

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


