# Roust

## THE RUST PROGRAMMING LANGUAGE 2nd Edition by Steve Klabnik and Carol Nichols

### Fearless Concurrency

###### What is Concurrent programming?

Parallel programming is when different parts of a program are executed independently,

###### What is Parallel programming?

Parallel programming is when different parts of a program are executed simultaneously

#### 16.1 Using Threads to Run Code Simultaneously

###### What is threads?

In most current operating systems, an executed program’s code is run in a process, and the operating system will manage multiple processes at once. Within a program, you can also have independent parts that run simultaneously. The features that run these independent parts are called threads

###### What are the benefits of using multiple threads?

Splitting the computation in your program into multiple threads to run multiple tasks at the same time can improve performance.

###### What are the problems of using multiple threads?

- this adds complexity
- because threads can run simultaneously, there’s no inherent guarantee about the order in which parts of your code on different threads will run
- Race conditions, where threads are accessing data or resources in an inconsistent order
- Deadlocks, where two threads are waiting for each other, preventing both threads from continuing
- Bugs that happen only in certain situations and are hard to reproduce and fix reliably

###### What is Race conditions?

Situation where threads are accessing the same data or resources in an inconsistent order

###### What is Deadlocks?

Situation where two threads are waiting for each other, preventing both threads from continuing

###### What create a new thread?

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

###### What happen whit spawned threads when main thread  completes?

When main thread of a Rust program completes, all spawned threads are shut down, whether or not they have finished running

###### How can we guarantee that a spawned thread will completely finish its execution?

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

###### What mean Blocking a thread?

Blocking a thread means that thread is prevented from performing work or exiting

###### How stop current thread execution for a short duration?

We need to call the `thread::sleep` function passing it the Duration

###### How we should use any data from the main thread in the spawned thread’s code?

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

###### What is `Message Passing` concurrency?

This is approach to ensuring safe concurrency where threads or actors communicate by sending each other messages containing data

###### How `Message Passing` implemented in Rust?

To accomplish message-passing concurrency, Rust’s standard library provides an implementation of channels. A channel is a general programming concept by which data is sent from one thread to another.

###### What is 'Channels'?

A channel is a general programming concept by which data is sent from one thread to another. By means Channels Rust accomplish message-sending concurrency.
A channel has two halves: a transmitter and a receiver. One part of your code calls methods on the transmitter with the data you want to send, and another part checks the receiving end for arriving messages. A channel is said to be closed if either the transmitter or receiver half is dropped.

###### How create Chanel for multiple producer and single consumer (mpsc)?

We must call `std::sync::mpsc::channel()` function. The `mpsc::channel` function returns a tuple, the first element of which is the sending end—the transmitter—and the second element is the receiving end—the receiver

```rust
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
}
```

###### How can we organize thread communication using mpsc Channel?

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

###### In Channel, is it possible to reuse a value in the sender code after it has been sent?

The sending end `send` method of mpsc Cannel takes ownership of its parameter, and when the value is moved, the receiver takes ownership of it. This stops us from accidentally using the value again after sending it; the ownership system checks that everything is okay.

###### How we can send multiple values in mpsc Channel?

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

###### How we can use multiply produsers whit mpsc Cannel?

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

###### What is Mutex?

Mutex is an abbreviation for mutual exclusion, as in, a mutex allows only one thread to access some data at any given time.
Mutex is described as guarding the data it holds via the locking system.

###### How create Mutex?

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

###### How Sharing a `Mutex<T>` Between Multiple Threads?

- We must wrap Mutex value inside `Arc<T>` type.
- Then we should clone Arc value and used cloned value inside thread code to access data inside a Mutex.

###### How does a thread access data inside a Mutex?

- To access the data inside the mutex, we use the `lock` method to acquire the lock.
- If the mutex is locked by another thread, this call will block the current thread so that it cannot do any work until it is its turn to acquire the lock.
- The call to `lock` returns a smart pointer called `MutexGuard`, wrapped in a `LockResult` that we can handled with the call to unwrap. We can treat the value as a mutable reference to the data inside.
- The call to lock would fail if another thread holding the lock panicked. In that case, no one would ever be able to get the lock.
- `Mutex<T>` is a smart pointer with a Drop implementation releases the lock automatically when a MutexGuard goes out of scope, which happens at the end of the inner scope.


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

###### What is `Arc<T>`?

`Arc<T>` is *atomically reference counted* type is using to enable multiple ownership value that it wrap. Unlike `Rc<T>`, `Arc<T>` used in multithreaded context.

###### What is Atomics?

Atomics are an additional kind of concurrency primitive that work like primitive types but are safe to share across threads.

documentation for [std::sync::atomic](https://doc.rust-lang.org/std/sync/atomic/index.html) for more details.

###### Way having immutable `Mutex<T>`  value we could get a mutable reference to the value inside it?

This is because `Mutex<T>` provides interior mutability, as the `Cell` family does. In the same way we using `RefCell<T>`

###### What is deadlock?

These occur when an operation needs to lock two resources and two threads have each acquired one of the locks, causing them to wait for each other forever.

#### 16.4 Extensible Concurrency with the Sync and Send Traits.

###### For what used The Send marker trait?

The Send marker trait indicates that ownership of values of the type implementing Send can be transferred between threads.

###### Are `Rc<T>` is `Send`?

`Rc<T>` cannot be Send because if you cloned an `Rc<T>` value and tried to transfer ownership of the clone to another thread, both threads might update the reference count at the same time. For this reason, `Rc<T>` is implemented for use in single-threaded situations where you don’t want to pay the thread-safe performance penalty.

###### Does we marked as Send Any type composed entirely of Send types?

Any type composed entirely of Send types is automatically marked as Send as well.

###### What primitive types are Send?

Almost all primitive types are Send, aside from raw pointers

###### For what used The Sync marker trait?

The Sync marker trait indicates that it is safe for the type implementing Sync to be referenced from multiple threads. In other words, any type T is Sync if &T (an immutable reference to T) is Send, meaning the reference can be sent safely to another thread.

###### Does we marked as Sync Any type composed entirely of Sync types?

Any type composed entirely of Sync types is automatically marked as Sync as well.

###### What primitive types are Sync?

All primitive types are Sync

###### How we can manually implement Send and Sync type?

Manually implementing these traits involves implementing unsafe Rust code and so requires careful thought to uphold the safety guarantees.

### 17 Fundamentals of Asynchronous Programming: Async, Await, Futures, and Streams

**READ THIS [Async Rust in Three Parts](https://jacko.io/async_intro.html)**

###### What techniques are for working on more than one operation at a time?

Modern computers offer two techniques for working on more than one operation at a time: parallelism and concurrency.

###### What is CPU-bound or compute-bound operation?

CPU-bound operation is operation that limited by the computer’s potential data processing speed within the CPU or GPU, and how much of that speed it can dedicate to the operation.

###### What is IO-bound operation?

Operation limited by the speed of the computer’s input and output?

###### What is concurrency?

When an individual works on several different tasks before any of them is complete, this is concurrency. Maybe you have two different projects checked out on your computer, and when you get bored or stuck on one project, you switch to the other. You’re just one person, so you can’t make progress on both tasks at the exact same time, but you can multi-task, making progress on one at a time by switching between them.

###### What is parallelism?

When the team splits up a group of tasks by having each member take one task and work on it alone, this is parallelism. Each person on the team can make progress at the exact same time

###### What is serial?

one of your own tasks depends on another of your tasks

#### 17.1 Futures and the Async Syntax

###### What is key elements of asynchronous programming in Rust?

The key elements of asynchronous programming in Rust are Future trait and Rust’s `async` and `await` keywords.

###### What is Future in Rust asynchronous programming?

- Rust provides a Future trait as a building block so that different async operations can be implemented with different data structures but with a common interface.
- A Future trait represent concept of future that is a value that may not be ready now but will become ready at some point in the future.
- In Rust, futures are types that implement the Future trait.
- Each future holds its own information about the progress that has been made and what “ready” means.

###### How to use `async` keyword?

You can apply the async keyword to blocks and functions to specify that they can be interrupted and resumed.

###### In what places of code async function or block can be paused and resumed.

Any point where you await a future within an async block or function is a potential spot for that async block or function to pause and resume.

###### What called process of checking with a Future to see if its value is available yet?

The process of checking with a future to see if its value is available yet is called *polling*.

###### How to use `await` keyword?

We must use `await` keyword only within an async block or async function.  We point `await` keyword  through the dot after call of async function to await a future (that is, wait for it to become ready).

###### What is `trpl` crate?

- `trpl` is short for “The Rust Programming Language”
- `trpl` was created to teach Rust async
- It re-exports all the types, traits, and functions you’ll need, primarily from the [futures](https://crates.io/crates/futures) and [tokio](https://tokio.rs/) crates.
- if you want to understand what the crate does, we encourage you to check out [its source code](https://github.com/rust-lang/book/tree/main/packages/trpl)

###### What is `futures` crate?

The futures crate is an official home for Rust experimentation for async code, and it’s actually where the Future trait was originally designed.

###### What is Tokio in Rust ?

Tokio is the most widely used async runtime in Rust today, especially for web applications.

###### How to define `async` function?

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

###### How Rust compile async function?

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

###### What is required for run async code?

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

###### What is Async Runtime?

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

###### How create a New async Task with `trpl::spawn_task`?

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

###### How create and run multiple async task? 

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

###### How Passing Messages between Futures (async tasks)?

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

###### Can we use `for` loop over an asynchronous series of items?

We can not use `for` loop over an asynchronous series of items, instead we can use `while let` conditional loop.

###### How we can iterate over asynchronous series of items?

We can use `while let` conditional loop. We can not use `for` loop.

###### What is `while let` conditional loop?

This is the loop version of the `if let` construct. The loop will continue executing as long as the pattern it specifies continues to match the value.

```rust
        while let Some(value) = rx.recv().await {
            println!("received '{value}'");
        }
```

#### 17.3 Working with Any Number of Futures


###### How we can run any number of async Task (Futures) the same type?

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

###### Can we run any number of async Task (Futures) different types?

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

###### How we can get only one future result from many futures?

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

###### In what order async runtime `race` run futures passed in as arguments?

Order depend on implementations of `race`. Some implementations always runs the futures passed in as arguments in the order in which they’re passed. Other implementations are fair and will randomly choose which future to poll first.


###### How we can yield control from a long-running task to the Runtime?

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

###### What is Streams in async Rust?

A stream is like an asynchronous form of iteration.

###### How we can create Stream from Iterator?

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

###### How we can create stream of messages?

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

###### How we can merge streams?


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

###### how Rust defines Future Trait?

```rust
use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```

###### How named Future’s associated type?

Output

###### What says Future’s associated type?

Future’s associated type Output says what the future resolves to.

###### What method define Future Trait?

Future trait define `poll` method.

###### Which takes and return the `poll` method of Future Trait?

`poll` method takes a special `Pin` reference for its `self` parameter and a mutable reference to a `Context` type, and returns `Poll<Self::Output>` type.

###### how Rust defines Poll type?

Rust define the Poll type as enum whit one variant that has a value, Ready(T), and one which does not, Pending. The Pending variant indicates that the future still has work to do, so the caller will need to check again later. The Ready variant indicates that the future has finished its work and the T value is available.

```rust
enum Poll<T> {
    Ready(T),
    Pending,
}
```

###### What happen if caller call `pull` again after the future has returned Ready?

Many futures will panic if polled again after becoming ready.

###### How Rust compile code that uses `await`?

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

###### What should Rust do when the future is still Pending?

Rust will call `pull` in loop again, and again, and again, until the future is finally ready. Rust makes sure that the loop can hand off control to Async Runtime that can pause work on this future to work on other futures and then check this one again later.

###### What is self-referential data types?

self-referential data types is types which objects hold reference on himself

###### Way self-referential data types is unsafe?

 If we move the self-referential structure to other location in memory, those internal self-references will be left pointing to the old location, that is become invalid.

######  What is Unpin and !Unpin Traits?

Unpin Trait are a marker trait which informs the compiler that a given type does not need to uphold any guarantees about whether the value in question can be safely moved in memory. Compiler implements Unpin automatically for all types where it can prove it is safe. A special case is where Unpin is not implemented for a type. The notation for this is `impl !Unpin for SomeType`, where `SomeType` is the name of a type that does need to uphold those guarantees to be safe whenever a pointer to that type is used in a Pin. 
In other words, there are two things to keep in mind about the relationship between Pin and Unpin. First, Unpin is the “normal” case, and !Unpin is the special case. Second, whether a type implements Unpin or !Unpin only matters when you’re using a pinned pointer to that type like Pin<&mut SomeType>.

###### What is Pin type?

`Pin` is a wrapper for pointer-like types such as `&`, `&mut`, `Box`, and `Rc`. `Pin` is not a pointer itself and doesn’t have any behavior of its own like `R`c and `Arc` do with reference counting; it’s purely a tool the compiler use to enforce that data referenced by wrapped pointer can not be moved in memory. Type of this data must be marked by !Unpin trait. If Type of this data must be marked by !Unpin trait

###### What does it affect Pin type?

If Pin type wraps pointer-like type such as `&`, `&mut`, `Box`, and `Rc`, that refers to a value of type marked with `!Unpin trait` the compiler enforce that data referenced by the wrapped pointer can not be moved in memory. If data type marked by Unpin trait - Pin type not affect.

###### Why we must wraps to Pin type a pointer-like types of Future for using it?

Rust compiles an asynchronous function into a state machine structure that implements Future. This structure can contain a reference to itself, i.e. it is a self-referencing type. Since self-referencing types are unsafe, since when moving their objects in memory the reference will become invalid - the object must be passed for use wrapped in Box and Pin, which provides protection against moving in memory.

###### Should we `pin` directly awaiting future?

Directly awaiting a `future` with await pins the `future` implicitly. That’s why we don’t need to use pin! everywhere we want to await futures.

###### What is Stream trait?

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

###### How named Stream’s associated type?

The Stream trait defines an associated type called Item for the type of the items produced by the stream.

###### Which method define Stream?

`poll_next`, name of the method it clear that it polls in the same way `Future::poll` does and produces a sequence of items in the same way `Iterator::next` does. 

###### What type return `poll_next` method of Stream? 

`Poll<Option<Self::Item>>`. Its return type combines `Poll` with `Option`. The outer type is `Poll`, because it has to be checked for readiness, just as a future does. The inner type is `Option`, because it needs to signal whether there are more messages, just as an iterator does.


###### What is StreamExt trait?

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

###### what rules should be followed when choosing between Async model and Treads?

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

###### Which Characteristics of Object-Oriented Languages?

OOP languages share certain common characteristics, namely:

- objects, 
- encapsulation, 
- inheritance.
- polymorphism

###### What is objects in OOP?

An object packages both data and the procedures that operate on that data. The procedures are typically called methods or operations.

###### How Rust implement OOP objects?

Rust implement objects by structs and enums that has data and impl blocks that provides methods on structs and enums.

###### What is encapsulation?

- encapsulation means that the implementation details of an object aren’t accessible to code using that object. Therefore, the only way to interact with an object is through its public API; 
- code using the object shouldn’t be able to reach into the object’s internals and change data or behavior directly. This enables the programmer to change and refactor an object’s internals without needing to change the code that uses the object.

###### How Rust implements encapsulation?

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

###### What is inheritance?

Inheritance is a mechanism whereby an object can inherit elements from another object’s definition, thus gaining the parent object’s data and behavior without you having to define them again.

###### How Rust implements inheritance?

Rust do not implements inheritance. There is no way to define a struct that inherits the parent struct’s fields and method implementations without using a macro.

###### How we can implement code reusing in Rust?

You can do this in a limited way in Rust code using default trait method implementations. This is similar to a parent class having an implementation of a method and an inheriting child class also having the implementation of the method. We can also override the default implementation of default method when implement trait, which is similar to a child class overriding the implementation of a method inherited from a parent class.

###### What is Polymorphism?

Polymorphism is general concept that refers to code that can work with data of multiple types, which is being implemented, among other things by inheritance.

###### How Rust implements Polymorphism?

Rust uses generics to abstract over different possible types and trait bounds to impose constraints on what those types must provide. This is sometimes called bounded parametric polymorphism.

#### 18.2 Using Trait Objects That Allow for Values of Different Types

###### How create vector that store different types?

We need to define an Enum and bind the variants to the types that we will store in the vector. Then we can store the Enum variants in the vector with the value of the types that are bound to these variants.

###### How implement common behavior (polymorphism) in Rust?

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

###### What is trait object?

We create a trait object by specifying some sort of pointer, such as a `&` reference or a `Box<T>` smart pointer, then the `dyn` keyword, and then specifying the relevant trait. A trait object points to both an instance of a type implementing our specified trait and a table used to look up trait methods on that type at runtime. We can use trait objects in place of a generic or concrete type. Wherever we use a trait object, Rust’s type system will ensure at compile time that any value used in that context will implement the trait object’s trait. Consequently, we don’t need to know all the possible types at compile time.
Specific purpose of trait object is to allow abstraction across common behavior. We can’t add data to a trait object

###### what is the difference in usage trait objects in place of a generic or concrete type?

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

On the other hand, with the method using trait objects, one Screen instance can hold a Vec<T> that contains a Box<Button> as well as a Box<TextField>. Let’s look at how this works, and then we’ll talk about the runtime performance implications.

###### What happen if we use values that don’t implement the traits that the trait objects need?

Rust won’t compile our code

#### 18.3 Implementing an Object-Oriented Design Pattern

###### What is state pattern?

The state pattern is an object-oriented design pattern. The crux of the pattern is that we define a set of states a value can have internally and the value’s behavior changes based on its state.
The value that holds a state object knows nothing about the different behavior of the states or when to transition between states.

###### What is advantage of using state pattern?

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

###### What is Patterns?

- Patterns are a special syntax in Rust for matching against the structure of types.
- To use a pattern, we compare it to some value to determine whether it has the correct shape of data to continue running a particular piece of code.
- Pattern can hav a named pieces, if compared value fits the shape of the pattern, we can use the named pieces in code associated with the pattern.

#### 19.1 All the Places Patterns Can Be Used

###### Where are used Patterns?

- match Arms
- Conditional if let Expressions
- while let Conditional Loops
- for Loops
- let Statements
- Function Parameters

###### How using Pattern in match Arms?

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

###### what is the mandatory requirement when using match Arms?

One requirement for match expressions is that they need to be exhaustive in the sense that all possibilities for the value in the match expression must be accounted for.

###### What method are for make exhaustive requirement for match expressions?

The  pattern `_` will match anything, so it’s often used in the last match arm for make exhaustive requirement.

###### Which pattern can match anything?

The particular pattern `_` will match anything, but it never binds to a variable

###### What pattern can be used for ignore  any value not specified?

The particular pattern `_` will match anything, but it never binds to a variable, so it can be useful when you want to ignore any value not specified.

###### For what used `if let` Expressions?

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

###### What are downside of using `if let` expressions?

The downside of using `if let` expressions is that the compiler doesn’t check for exhaustiveness, whereas with `match` expressions it does.

###### For what used `while let` Conditional Loops?

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

###### How to used a pattern in `for` Loops?

In a for loop, the value that directly follows the keyword `for` is a pattern. For example, in `for x in y` the x is the pattern.

```rust
    let v = vec!['a', 'b', 'c'];

    for (index, value) // pattern used to destructure
        in v.iter().enumerate() { // adapt an iterator using the enumerate method so it produces a value and the index for that value, placed into a tuple. 
    
        println!("{value} is at index {index}");
    }
```

###### How used pattern whit `let` Statements whit binging value?

Every time we are using a let statement we are using patterns.

```
let PATTERN = EXPRESSION;
```

Whit a variable binding statements (for example let x = 5) left side is a pattern. Right side of this statement is expression that Rust calculates and compares value against the left part pattern and binds to any names it finds in left side. So in the let x = 5; example, x is a pattern that means “bind what matches here to the variable x.” That is in `let` Statements we can used more complicated patterns. For example, we can match value of tuple of three value against pattern of three value tuple type. Rust make destruction and binding values in tuple to variable names used in pattern. If the value does not match the pattern, it will result in a compilation error. To fix the error, we could ignore one or more of the values in the tuple using `_` or `..`.

```rust
    let (x, y, z) = (1, 2, 3);
    let (x, y) = (1, 2, 3); // error[E0308]: mismatched types
```

###### How is used patterns whit Function parameters?

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

###### When patterns are irrefutable?

Patterns that will match for any possible value passed are irrefutable. An example would be x in the statement `let x = 5;` because x matches anything and therefore cannot fail to match.

###### When patterns are refutable?

Patterns that can fail to match for some possible value are refutable.

###### Which type of pattern can accept function parameters, `let` statements, and `for` loops?

Function parameters, let statements, and for loops can only accept irrefutable patterns, because the program cannot do anything meaningful when values don’t match. 

###### Which type of pattern can accept `if let`, `while let` expressions and the `let-else` statement?

The `if let` and `while let` expressions and the `let-else` statement accept refutable and irrefutable patterns.

```rust
    let Some(x) = some_option_value; 
    
    //If some_option_value was a None value, it would fail to match the pattern Some(x), meaning the pattern is refutable. However, the let statement can only accept an irrefutable pattern because there is nothing valid the code can do with a None value. At compile time, Rust will complain that we’ve tried to use a refutable pattern where an irrefutable pattern is required:
```

###### Why a compiler warns against irrefutable patterns in `if let`, `while let` expressions and the `let-else` statement?

compiler well warns because by definition `if let`, `while let` expressions and the `let-else` statement intended to handle possible failure: the functionality of a conditional is in its ability to perform differently depending on success or failure.

```rust
    if let x = 5 { // warning: irrefutable `if let` pattern
        println!("{x}");
    };
```

###### How we can fix situation when we have a refutable pattern where an irrefutable pattern is needed?

If we have a refutable pattern where an irrefutable pattern is needed, we can fix it by changing the code that uses the pattern: instead of using `let`, we can use `if let`. Then if the pattern doesn’t match, the code will just skip the code in the curly brackets, giving it a way to continue validly.

```rust

    // let Some(x) = some_option_value; // note: `let` bindings require an "irrefutable pattern", like a `struct` or an `enum` with only one variant

    if let Some(x) = some_option_value {
        println!("{x}");
    }
```

#### 19.3 Pattern Syntax

###### How we can directly maths patterns match patterns against literals?

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

###### How we can use named variables in patterns to match values?

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

###### How we can match multiple patterns inside one match arm?

We can match multiple patterns using the | syntax, which is the pattern or operator.

```rust
    let x = 1;

    match x {
        1 | 2 => println!("one or two"),
        3 => println!("three"),
        _ => println!("anything"),
    }
```

###### What is pattern 'or' operator?

Pattern or operator is used for matching multiple patterns and is denoted as `|`.

###### How we can Matching Ranges of Values?

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

###### How to destructure Struct?

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

###### How to destructure Enum?

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

###### How to destructure Nested Structs and Enums?

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

###### How to destructure mix of Structs and Tuples?

```rust
    let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });
```

##### Ignoring Values in a Pattern

###### Why is it sometimes necessary to ignore values ​​in a pattern?

it’s sometimes useful to ignore values in a pattern, such as in the last arm of a match, to get a catchall that doesn’t actually do anything but does account for all remaining possible values.

###### How to ignore entire value in a pattern?

We’ve used the underscore `_` as a wildcard pattern that will match any value but not bind to the value.

###### In which cases we can ignoring entire value in a pattern?

This is especially useful as the last arm in a match expression, but we can also use it in any pattern, including function parameters,

###### Why might we need to ignore a value in a function?

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

###### How to ignore part of a value in patterns?

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

###### Why might we need to ignore a unused Variable?

If you create a variable but don’t use it anywhere, Rust will usually issue a warning because an unused variable could be a bug. However, sometimes it’s useful to be able to create a variable you won’t use yet, such as when you’re prototyping or just starting a project. In this situation, you can tell Rust not to warn you about the unused variable by starting the name of the variable with an underscore.

###### How we can ignore a unused Variable?

starting the name of the variable with an underscore `_`.

```rust
Filename: src/main.rs
fn main() {
    let _x = 5;
    let y = 10;
}
```

###### What difference between using underscore `_` and underscore whit variable name `_x`?

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

###### How can we ignore Remaining Parts of a Value?

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

###### What is *match guard*?

A match guard is an additional `if` condition, specified after the pattern in a match arm, that must also match for that arm to be chosen. The condition can use variables created in the pattern.

```rust
    let num = Some(4);

    match num {
        Some(x) if x % 2 == 0 => println!("The number {x} is even"),
        Some(x) => println!("The number {x} is odd"),
        None => (),
    }
```

###### When allowed *match guard*?

They are only available in `match` expressions, not in `if let` or `while let` expressions.

###### How we can use match guards to solve pattern-shadowing problem?

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

###### How we can use match guards whit 'or' operator `|`?

```rust
    let x = 4;
    let y = false;

    match x {
        4 | 5 | 6 if y => println!("yes"),
        _ => println!("no"),
    }
```

##### @ Bindings

###### For what used *at* `@` Bindings operator in patterns?

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

### 20 Advanced Features

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


