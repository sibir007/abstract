# Roust

## RUST IN PRACTICE A Programmers Guide to Build Rust Programs, Test Applications and Create Cargo Packages (Second Edition) Rick Tim

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

If we define function that accept some borrows and return borrow and we do not definitely determine from what parameter  borrowed return value we must specify to compiler how determine lifetime of return borrow.