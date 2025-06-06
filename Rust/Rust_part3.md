# Roust

## THE RUST PROGRAMMING LANGUAGE 2nd Edition by Steve Klabnik and Carol Nichols

### Advanced Features

#### 20.1 Unsafe Rust

###### What is Unsafe Rust?

Regular rust code had Rust’s memory safety guarantees enforced at compile time.  However, Rust has a second language hidden inside it that doesn’t enforce these memory safety guarantees: it’s called unsafe Rust and gives us extra superpowers.

###### What is Unsafe Rust for?

unsafe Rust gives us extra superpowers.

###### Why exists Unsafe Rust?

Unsafe Rust exists because, by nature, static analysis is conservative. When the compiler tries to determine whether or not code upholds the guarantees, it’s better for it to reject some valid programs than to accept some invalid programs. Although the code might be okay, if the Rust compiler doesn’t have enough information to be confident, it will reject the code. In these cases, you can use unsafe code to tell the compiler, “Trust me, I know what I’m doing.”

Another reason Rust has an unsafe alter ego is that the underlying computer hardware is inherently unsafe. If Rust didn’t let you do unsafe operations, you couldn’t do certain tasks. Rust needs to allow you to do low-level systems programming, such as directly interacting with the operating system or even writing your own operating system. Working with low-level systems programming is one of the goals of the language.

##### Unsafe Superpowers

###### How switch to unsafe Rust?

To switch to unsafe Rust, use the unsafe keyword and then start a new block that holds the unsafe code.

###### There is the borrow checking in unsafe Rust?

`unsafe` doesn’t turn off the borrow checker or disable any other of Rust’s safety checks: if you use a reference in unsafe code, it will still be checked. The unsafe keyword only gives you access to  'unsafe superpowers' five features that are then not checked by the compiler for memory safety.

###### What is intent of 'unsafe' block?

the intent is that as the programmer, will ensure the code inside an unsafe block will access memory in a valid way. By requiring five unsafe operations to be inside blocks annotated with `unsafe` the programmer will know that any errors related to memory safety must be within an unsafe block.

###### What we call unsafe superpowers?

Those superpowers include the ability to:

- Dereference a raw pointer
- Call an unsafe function or method
- Access or modify a mutable static variable
- Implement an unsafe trait
- Access fields of a `union`

###### What is Safe API?

Safe API is a safe abstraction over unsafe code.

##### Dereferencing a Raw Pointer

###### What is Raw Pointers?

Raw Pointers are Unsafe Rust types that are similar to references and allows executes unsafe operations on the values they point to.

###### What are the raw pointers?

raw pointers can be immutable or mutable

###### How raw pointers are written?

Raw pointers written as `*const T` and `*mut T`, respectively. The asterisk isn’t the dereference operator; it’s part of the type name.

###### What means 'immutable' in the context of raw pointers?

In the context of raw pointers, immutable means that the pointer can’t be directly assigned to after being dereferenced.

###### What different raw pointers from references and smart pointers? 

raw pointers:

` Are allowed to ignore the borrowing rules by having both immutable and mutable pointers or multiple mutable pointers to the same location
` Aren’t guaranteed to point to valid memory
` Are allowed to be null
` Don’t implement any automatic cleanup

###### Can we create raw pointers outside `unsafe` block in safe code?

We can create raw pointers in safe code; we just can’t dereference raw pointers outside an unsafe block.

```rust
    let mut num = 5;

    let r1 = &raw const num; // immutable
    let r2 = &raw mut num; //  mutable
```

###### What restrictions of using raw pointers in safe code?

We can create raw pointers in safe code; we just can’t dereference raw pointers outside an unsafe block.

###### How create raw pointer?

We’ve created raw pointers by using the `raw` borrow operators: `&raw const var_name_of_type_T` creates a '*const T' immutable raw pointer, and `&raw mut var_name_of_type_T` creates a '*mut T' mutable raw pointer.

```rust
    let mut num = 5;

    let r1 = &raw const num; // immutable
    let r2 = &raw mut num; //  mutable
```

###### What is the danger of using raw pointers?

With raw pointers, we can create a mutable pointer and an immutable pointer to the same location and change data through the mutable pointer, potentially creating a data race

###### Why would ever use raw pointers?

- One major use case is when interfacing with C code
- Another case is when building up safe abstractions that the borrow checker doesn’t understand.

###### What we can dereference raw pointers?

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

###### What is Unsafe Function?

Unsafe Function is function that has requirements we need to uphold when we call this function, because Rust can’t guarantee we’ve met these requirements. By calling an unsafe function within an unsafe block, we’re saying that we’ve read this function’s documentation and take responsibility for upholding the function’s contracts.

###### How is an unsafe function indicated?

Unsafe functions and methods look exactly like regular functions and methods, but they have an extra `unsafe` before the rest of the definition.

###### How call Unsafe Function?

We must call an Unsafe Function within a separate `unsafe` block. If we try to call Unsafe Functions without the unsafe block, we’ll get an error.

###### How we must perform unsafe operations in the body of an unsafe function?

To perform unsafe operations in the body of an unsafe function, you still need to use an `unsafe` block just as within a regular function, and the compiler will warn you if you forget. This helps to keep `unsafe` blocks as small as possible, as unsafe operations may not be needed across the whole function body.

###### Is the function unsafe if it contain unsafe code?

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

###### What is FFI?

FFI is an abbreviation of Foreign Function Interface is a way for a programming language to define functions and enable a different (foreign) programming language to call those functions.

###### What is the `extern` Rust keyword used for?

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

###### Way need declare `extern` block by `unsafe` keyword?

Functions declared within `extern` blocks are usually unsafe to call from Rust code, so they must also be marked `unsafe`. The reason is that other languages don’t enforce Rust’s rules and guarantees, and Rust can’t check them, so responsibility falls on the programmer to ensure safety.

###### How to define an extern function defined in another language?

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

###### How to call an extern function defined in another language?

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

###### How call Rust Functions from Other Languages?

We should create an interface that allows other languages to call Rust functions. We add the extern keyword and specify the ABI to use just before the `fn` keyword for the relevant function. We also need to add a `#[unsafe(no_mangle)]` annotation to tell the Rust compiler not to mangle the name of this function.

```rust
// In the following example, we make the call_from_c function accessible from C code, after it’s compiled to a shared library and linked from C:

#[unsafe(no_mangle)]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

###### What is *Mangling*?

Mangling is when a compiler changes the name we’ve given a function to a different name that contains more information for other parts of the compilation process to consume but is less human readable.

##### Accessing or Modifying a Mutable Static Variable.

###### How create static variable?

We point `static` keyword followed name in SCREAMING_SNAKE_CASE naming convention to which binding value of type: reference with the 'static lifetime.

```rust
Filename: src/main.rs
static HELLO_WORLD: &str = "Hello, world!";

fn main() {
    println!("name is: {HELLO_WORLD}");
}
```

###### What is Static Variables?

A Static Variables is a Global variables, that is they are available from all places of program.

###### Way convention of naming static variables?

SCREAMING_SNAKE_CASE

###### What value can store static variable?

Static variables can only store references with the 'static lifetime, which means the Rust compiler can figure out the lifetime and we aren’t required to annotate it explicitly. Accessing an immutable static variable is safe.

###### What is differences static variables from constants?

- Values in a static variable have a fixed address in memory. Using the value will always access the same data. Constants, on the other hand, are allowed to duplicate their data whenever they’re used. 
- Another difference is that static variables can be mutable.

###### Is it safe accessing and modifying mutable static variables?

Accessing and modifying mutable static variables is unsafe.

###### What is unsafe using mutable static variables?

If two threads are accessing the same mutable global variable, it can cause a data race.

###### How we must access a mutable static variables?

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

###### How we should comment unsafe function?

Whenever we write an unsafe function, it is idiomatic to write a comment starting with `SAFETY` and explaining what the caller needs to do to call the function safely.

###### How we should comment unsafe operation?

whenever we perform an unsafe operation, it is idiomatic to write a comment starting with SAFETY to explain how the safety rules are upheld.

###### How create reference to static mutable variable?

The compiler will not allow you to create references to a mutable static variable. You can only access it via a raw pointer, created with one of the raw borrow operators. That includes in cases where the reference is created invisibly, as when it is used in the println!. The requirement that references to static mutable variables can only be created via raw pointers helps make the safety requirements for using them more obvious.

##### Implementing an Unsafe Trait

###### When Trait is unsafe?

A trait is unsafe when at least one of its methods has some invariant that the compiler can’t verify. We declare that a trait is unsafe by adding the `unsafe` keyword before trait and marking the implementation of the trait as `unsafe` too.

###### How declare unsafe Trait?

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

###### What is Union?

A union is similar to a struct, but only one declared field is used in a particular instance at one time. Unions are primarily used to interface with unions in C code. You can learn more about unions in the [Rust Reference](https://doc.rust-lang.org/reference/items/unions.html).

###### How to access a Union fields?

Accessing union fields is unsafe because Rust can’t guarantee the type of the data currently being stored in the union instance, so accessing fields of a union can only in `unsafe` block.

##### Using Miri to check unsafe code

###### What is Miri?

When writing unsafe code, you might want to check that what you have written actually is safe and correct. One of the best ways to do that is to use [Miri](https://github.com/rust-lang/miri), an official Rust tool for detecting undefined behavior.

###### How Miri check unsafe code?

Whereas the borrow checker is a static tool which works at compile time, Miri is a dynamic tool which works at runtime. It checks your code by running your program, or its test suite, and detecting when you violate the rules it understands about how Rust should work. 
Miri doesn’t catch everything you might get wrong when writing unsafe code. For one thing, since it is a dynamic check, it only catches problems with code that actually gets run. That means you will need to use it in conjunction with good testing techniques to increase your confidence about the unsafe code you have written. For another thing, it does not cover every possible way your code can be unsound. If Miri does catch a problem, you know there’s a bug, but just because Miri doesn’t catch a bug doesn’t mean there isn’t a problem. Miri can catch a lot, though. 

###### What is required to use Miri?

Using Miri requires a nightly build of Rust.

###### How install Miri?

You can install both a nightly version of Rust and the Miri tool by typing `rustup +nightly component add miri`

###### How run Miri?

You can run Miri on a project by typing cargo +nightly miri run or `cargo +nightly miri test`.

###### Where deeper exploration of how to work effectively with unsafe Rust?

[Rustonomicon](https://doc.rust-lang.org/nomicon/)

#### 20.2 Advanced Traits

##### Specifying Placeholder Types in Trait Definitions with Associated Types

###### What is Trait whit associated type?

This is a trait that point type placeholder for associated types as some name that trait then is using in method definitions. Implementors of the trait must provide a type to stand in for the associated type placeholder.

###### What is used Trait whit associated type for?

By using definition of Trait whit associated type we can define a trait that uses some types without needing to know exactly what those types are until the trait is implemented.

###### How to define Trait whit associated type?

We point `type` keyword followed name of type TYPE_NAME that is associated types placeholder, then we can use type placeholder in trait method definitions as `Self::TYPE_NAME`

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}
```

###### How implement Trait whit associated type?

The implementor of a trait will specify the concrete type to be used instead of the placeholder type for the particular implementation.

```rust
impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        // --snip--
```

##### Default Generic Type Parameters and Operator Overloading

###### Why can we specify a specific default type for a generic type?

This eliminates the need for implementors of the trait to specify a concrete type if the default type works.

###### How specify a default type when declaring a generic type?

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

###### How we can call method that have the same name in different trait that is implemented by  type or in self implementation?

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

###### How we can call non-method function that have the same name in different implemented trait or in self implementation?

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

###### Which is general fully qualified syntax?

`<Type as Trait>::function(receiver_if_method, next_arg, ...);`

##### Using Supertraits to Require One Trait’s Functionality Within Another Trait

###### What is Supertrait?

Sometimes, you might write a trait definition that depends on another trait: for a type to implement the first trait, you want to require that type to also implement the second trait. You would do this so that your trait definition can make use of the associated items of the second trait. The trait your trait definition is relying on is called a supertrait of your trait.

###### How to define Supertrait?

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

###### What is Newtype pattern used for?

When implementing trait on a type we must follows 'orphan rule' that states we’re only allowed to implement a trait on a type if either the trait or the type are local to our crate. To get around this restriction is used the 'newtype pattern', which involves creating a new type in a tuple struct.

###### How use Newtype pattern for Implement External Traits on External Types?

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

###### What are the possibilities of using the Newtype pattern?

- Implement External Traits on External Types
- use the newtype pattern to abstract away some implementation details of a type: the new type can expose a public API that is different from the API of the private inner type
- The newtype pattern is a lightweight way to achieve encapsulation to hide implementation details,

##### Creating Type Synonyms with Type Aliases.

###### How create Type Synonyms?

###### What is Type Alias?

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

###### What is Never Type?

Never Type is type that has no values.

###### How denoted Never Type?

Never Type denoted by `!` (exclamation mark). It stands in the place of the return type when a function will never return.

```rust
fn bar() -> ! {
    // --snip--
}
```

###### What is *diverging functions*?

Functions that return *never* are called *diverging functions*. We can’t create values of the type `!` so function can never possibly return.

###### What use is a type you can never create values for?

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

###### What is DST?

Rust needs to know certain details about its types, such as how much space to allocate for a value of a particular type. DST is abbreviation from "dynamically sized types", that denotes types that let us write code using values whose size we can know only at runtime.

###### What is "unsized type"?

"Unsized type" is synonym to "dynamically sized types".

###### What DSTs are there in Rust?

 Slices and trait objects (`dyn Trait`).

###### How we can use DST?

We can use DST only in combination with some type of Pointer: `&[T]`, `Box<[T]>`, `Rc<[T]>`, `&dyn Trait`, `Box<dyn Trait>` `Rc<dyn Trait>` etc.

###### What is `Sized` trait?

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

###### How we can provide DST as type arguments to generic type parameters?

DSTs can be provided as type arguments to generic type parameters having the special `?Sized` bound. They can also be used for associated type definitions when the corresponding associated type declaration has a `?Sized` bound. By default, any type parameter or associated type has a `Sized` bound, unless it is relaxed using `?Sized`.

```rust
fn generic<T: ?Sized>(t: &T) {
    // --snip--
}
```

###### Can we implement Trait for DSTs?

Traits may be implemented for DSTs. Unlike with generic type parameters, Self: ?Sized is the default in trait definitions.

###### Can a struct contain a DST?

Structs may contain a DST as the last field; this makes the struct itself a DST.

#### 20.4 Advanced Functions and Closures.

##### Function Pointers

###### Can you pass a function to a function?

We can pass regular functions to functions.

###### What is Function pointer type?

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

###### How we can pass a function to a function?

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

###### Can we specify `fn` as the parameter type directly?

Unlike closures, fn is a type rather than a trait, so we specify fn as the parameter type directly rather than declaring a generic type parameter with one of the Fn traits as a trait bound.

###### Can we pass function pointer as an argument for a function that expects a closure?

Function pointers implement all three of the closure traits (Fn, FnMut, and FnOnce), meaning you can always pass a function pointer as an argument for a function that expects a closure. It’s best to write functions using a generic type and one of the closure traits so your functions can accept either functions or closures. That said, one example of where you would want to only accept fn and not closures is when interfacing with external code that doesn’t have closures: C functions can accept functions as arguments, but C doesn’t have closures.

```rust
    let list_of_numbers = vec![1, 2, 3];
    let list_of_strings: Vec<String> =
        // list_of_numbers.iter().map(|i| i.to_string()).collect(); // passing closure
        list_of_numbers.iter().map(ToString::to_string).collect(); // passing fn
```

###### Can we used name of enum variant as closure to pass in to function?

name of each enum variant becomes an initializer function. We can use these initializer functions as function pointers that implement the closure traits, which means we can specify the initializer functions as arguments for methods that take closures.

```rust
    enum Status {
        Value(u32),
        Stop,
    }

    let list_of_statuses: Vec<Status> = (0u32..20).map(Status::Value).collect();
```

##### Returning Closures

###### Can we return Closure directly?

Closures are represented by traits, in most cases where you might want to return a trait, you can instead use the concrete type that implements the trait as the return value of the function. However, you can’t do that with closures because they don’t have a concrete type that is returnable - which means you can’t return closures directly.

###### How we can return Closure from function?

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

###### What read about how to write macros?

[“The Little Book of Rust Macros”](https://veykril.github.io/tlborm/)

###### What is macros?

Fundamentally, macros are a way of writing code that writes other code, which is known as metaprogramming.

The term macro refers to a family of features in Rust: declarative macros with macro_rules! and three kinds of procedural macros:

- Custom `#[derive]` macros that specify code added with the derive attribute used on structs and enums
- Attribute-like macros that define custom attributes usable on any item
- Function-like macros that look like function calls but operate on the tokens specified as their argument

###### The Difference Between Macros and Functions

###### What difference between Macros and Function?

- Macros is called at compile time before compiler interprets the meaning of the code and is used for write code that will executed at runtime. Function is executable code and executed at runtime.
- A function signature must declare the number and type of parameters the function has. Macros, on the other hand, can take a variable number of parameters
- The downside to implementing a macro instead of a function is that macro definitions are more complex than function definitions because you’re writing Rust code that writes Rust code. Due to this indirection, macro definitions are generally more difficult to read, understand, and maintain than function definitions.
- Another important difference between macros and functions is that you must define macros or bring them into scope before you call them in a file, as opposed to functions you can define anywhere and call anywhere.

##### Declarative Macros with macro_rules! for General Metaprogramming

###### What is Declarative Macros?

Declarative Macros is most widely used form of macros in Rust. These are also sometimes referred to as “macros by example,” “macro_rules! macros,” or just plain “macros.” At their core, declarative macros allow you to write something similar to a Rust match expression. In case of macros the value is the literal Rust source code passed to the macro; the patterns are compared with the structure of that source code; and the code associated with each pattern, when matched, replaces the code passed to the macro. This all happens during compilation.

###### How define a Declarative Macros?

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

###### What is Procedural Macro?

Procedural macros accept some code as an input, operate on that code, and produce some code as an output rather than matching against patterns and replacing the code with other code as declarative macros do.

###### How is kinds of procedural macros?

- custom derive
- attribute-like
- function-like

###### How create procedural macros?

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

###### For what using derive Macro?

Derive Macro using with struct and enum for generating code for the derive attribute.

###### How to Write a Custom derive Macro?

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

###### For what is used `proc_macro` crate?

The `proc_macro` crate is the compiler’s API that allows us to read and manipulate Rust code from our code. The `proc_macro` crate comes with Rust, so we didn’t need to add that to the dependencies in Cargo.toml.

###### For what is used `syn` crate?

The `syn` crate parses Rust code from a string into a data structure that we can perform operations on.

###### For what is used `quote` crate?

The `quote` crate turns syn data structures back into Rust code.

##### Attribute-like macros

###### What is Attribute-like macros

Attribute-like macros are similar to custom derive macros, but instead of generating code for the derive attribute, they allow you to create new attributes. They’re also more flexible: derive only works for structs and enums; attributes can be applied to other items as well, such as functions.

###### How define and use Attribute-like macros?

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

###### How define and use Function-like macros?

Function-like macros define macros that look like function calls. Similarly to macro_rules! macros, they’re more flexible than functions; for example, they can take an unknown number of arguments. However, macro_rules! macros can be defined only using the match-like syntax. Function-like macros take a TokenStream parameter and their definition manipulates that TokenStream using Rust code as the other two types of procedural macros do.

```rust
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
```

```rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```

### Final Project: Building a Multithreaded Web Server

