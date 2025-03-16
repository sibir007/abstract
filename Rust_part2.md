# Roust

## THE RUST PROGRAMMING LANGUAGE 2nd Edition by Steve Klabnik and Carol Nichols

### Fearless Concurrency

##### What is Concurrent programming?

Parallel programming is when different parts of a program are executed independently,

##### What is Parallel programming?

Parallel programming is when different parts of a program are executed simultaneously

#### 16.1 Using Threads to Run Code Simultaneously

##### What is threads

In most current operating systems, an executed program’s code is run in a process, and the operating system will manage multiple processes at once. Within a program, you can also have independent parts that run simultaneously. The features that run these independent parts are called threads

##### What are the benefits of using multiple threads?

Splitting the computation in your program into multiple threads to run multiple tasks at the same time can improve performance.

##### What are the problems of using multiple threads?

- this adds complexity
- because threads can run simultaneously, there’s no inherent guarantee about the order in which parts of your code on different threads will run
- Race conditions, where threads are accessing data or resources in an inconsistent order
- Deadlocks, where two threads are waiting for each other, preventing both threads from continuing
- Bugs that happen only in certain situations and are hard to reproduce and fix reliably

##### What is Race conditions?

Situation where threads are accessing the same data or resources in an inconsistent order

##### What is Deadlocks?

Situation where two threads are waiting for each other, preventing both threads from continuing

##### What create a new thread?

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

##### What happen whit spawned threads when main thread  completes?

When main thread of a Rust program completes, all spawned threads are shut down, whether or not they have finished running

##### How can we guarantee that a spawned thread will completely finish its execution?

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

##### What mean Blocking a thread?

Blocking a thread means that thread is prevented from performing work or exiting

##### How stop current thread execution for a short duration?

We need to call the `thread::sleep` function passing it the Duration

##### How we should use any data from the main thread in the spawned thread’s code?

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

##### What is `Message Passing` concurrency?

This is approach to ensuring safe concurrency where threads or actors communicate by sending each other messages containing data

##### How `Message Passing` implemented in Rust?

To accomplish message-passing concurrency, Rust’s standard library provides an implementation of channels. A channel is a general programming concept by which data is sent from one thread to another.

##### What is 'Channels'?

A channel is a general programming concept by which data is sent from one thread to another. By means Channels Rust accomplish message-sending concurrency.
A channel has two halves: a transmitter and a receiver. One part of your code calls methods on the transmitter with the data you want to send, and another part checks the receiving end for arriving messages. A channel is said to be closed if either the transmitter or receiver half is dropped.

##### How create Chanel for multiple producer and single consumer (mpsc)?

We must call `std::sync::mpsc::channel()` function. The `mpsc::channel` function returns a tuple, the first element of which is the sending end—the transmitter—and the second element is the receiving end—the receiver

```rust
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
}
```

##### How can we organize thread communication using mpsc Channel?

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

##### In Channel, is it possible to reuse a value in the sender code after it has been sent?

The sending end `send` method of mpsc Cannel takes ownership of its parameter, and when the value is moved, the receiver takes ownership of it. This stops us from accidentally using the value again after sending it; the ownership system checks that everything is okay.

##### How we can send multiple values in mpsc Channel?

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

##### How we can use multiply produsers whit mpsc Cannel?

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

##### What is Mutex?

Mutex is an abbreviation for mutual exclusion, as in, a mutex allows only one thread to access some data at any given time.
Mutex is described as guarding the data it holds via the locking system.

##### How create Mutex?

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

##### How Sharing a `Mutex<T>` Between Multiple Threads?

- We must wrap Mutex value inside `Arc<T>` type.
- Then we should clone Arc value and used cloned value inside thread code to access data inside a Mutex.

##### How does a thread access data inside a Mutex?

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

##### What is `Arc<T>`?

`Arc<T>` is *atomically reference counted* type is using to enable multiple ownership value that it wrap. Unlike `Rc<T>`, `Arc<T>` used in multithreaded context.

##### What is Atomics?

Atomics are an additional kind of concurrency primitive that work like primitive types but are safe to share across threads.

documentation for [std::sync::atomic](https://doc.rust-lang.org/std/sync/atomic/index.html) for more details.

##### Way having immutable `Mutex<T>`  value we could get a mutable reference to the value inside it?

This is because `Mutex<T>` provides interior mutability, as the `Cell` family does. In the same way we using `RefCell<T>`

##### What is deadlock?

These occur when an operation needs to lock two resources and two threads have each acquired one of the locks, causing them to wait for each other forever.

#### 16.4 Extensible Concurrency with the Sync and Send Traits.

##### For what used The Send marker trait?

The Send marker trait indicates that ownership of values of the type implementing Send can be transferred between threads.

##### Are `Rc<T>` is `Send`?

`Rc<T>` cannot be Send because if you cloned an `Rc<T>` value and tried to transfer ownership of the clone to another thread, both threads might update the reference count at the same time. For this reason, `Rc<T>` is implemented for use in single-threaded situations where you don’t want to pay the thread-safe performance penalty.

##### Does we marked as Send Any type composed entirely of Send types?

Any type composed entirely of Send types is automatically marked as Send as well.

##### What primitive types are Send?

Almost all primitive types are Send, aside from raw pointers

##### For what used The Sync marker trait?

The Sync marker trait indicates that it is safe for the type implementing Sync to be referenced from multiple threads. In other words, any type T is Sync if &T (an immutable reference to T) is Send, meaning the reference can be sent safely to another thread.

##### Does we marked as Sync Any type composed entirely of Sync types?

Any type composed entirely of Sync types is automatically marked as Sync as well.

##### What primitive types are Sync?

All primitive types are Sync

##### How we can manually implement Send and Sync type?

Manually implementing these traits involves implementing unsafe Rust code and so requires careful thought to uphold the safety guarantees.

### 17 Fundamentals of Asynchronous Programming: Async, Await, Futures, and Streams

##### What techniques are for working on more than one operation at a time?

Modern computers offer two techniques for working on more than one operation at a time: parallelism and concurrency.

##### What is CPU-bound or compute-bound operation?

CPU-bound operation is operation that limited by the computer’s potential data processing speed within the CPU or GPU, and how much of that speed it can dedicate to the operation.

##### What is IO-bound operation?

Operation limited by the speed of the computer’s input and output?

##### What is concurrency?

When an individual works on several different tasks before any of them is complete, this is concurrency. Maybe you have two different projects checked out on your computer, and when you get bored or stuck on one project, you switch to the other. You’re just one person, so you can’t make progress on both tasks at the exact same time, but you can multi-task, making progress on one at a time by switching between them.

##### What is parallelism?

When the team splits up a group of tasks by having each member take one task and work on it alone, this is parallelism. Each person on the team can make progress at the exact same time

##### What is serial?

one of your own tasks depends on another of your tasks

#### 17.1 Futures and the Async Syntax

##### What is key elements of asynchronous programming in Rust?

The key elements of asynchronous programming in Rust are Future trait and Rust’s `async` and `await` keywords.

##### What is Future in Rust asynchronous programming?

- Rust provides a Future trait as a building block so that different async operations can be implemented with different data structures but with a common interface.
- A Future trait represent concept of future that is a value that may not be ready now but will become ready at some point in the future.
- In Rust, futures are types that implement the Future trait.
- Each future holds its own information about the progress that has been made and what “ready” means.

##### How to use `async` keyword?

You can apply the async keyword to blocks and functions to specify that they can be interrupted and resumed.

##### In what places of code async function or block can be paused and resumed.

Any point where you await a future within an async block or function is a potential spot for that async block or function to pause and resume.

##### What called process of checking with a Future to see if its value is available yet?

The process of checking with a future to see if its value is available yet is called *polling*.

##### How to use `await` keyword?

We must use `await` keyword only within an async block or async function.  We point `await` keyword  through the dot after call of async function to await a future (that is, wait for it to become ready).

##### What is `trpl` crate?

- `trpl` is short for “The Rust Programming Language”
- `trpl` was created to teach Rust async
- It re-exports all the types, traits, and functions you’ll need, primarily from the [futures](https://crates.io/crates/futures) and [tokio](https://tokio.rs/) crates.
- if you want to understand what the crate does, we encourage you to check out [its source code](https://github.com/rust-lang/book/tree/main/packages/trpl)

##### What is `futures` crate?

The futures crate is an official home for Rust experimentation for async code, and it’s actually where the Future trait was originally designed.

##### What is Tokio in Rust ?

Tokio is the most widely used async runtime in Rust today, especially for web applications.

##### How to define `async` function?

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

##### How Rust compile async function?

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

##### What is required for run async code?

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

##### What is Async Runtime?

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

##### How create a New async Task with `trpl::spawn_task`?

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

##### How create and run multiple async task? 

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

##### How Passing Messages between Futures (async tasks)?

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

##### Can we use `for` loop over an asynchronous series of items?

We can not use `for` loop over an asynchronous series of items, instead we can use `while let` conditional loop.

##### How we can iterate over asynchronous series of items?

We can use `while let` conditional loop. We can not use `for` loop.

##### What is `while let` conditional loop?

This is the loop version of the `if let` construct. The loop will continue executing as long as the pattern it specifies continues to match the value.

```rust
        while let Some(value) = rx.recv().await {
            println!("received '{value}'");
        }
```

#### 17.3 Working with Any Number of Futures


##### How we can run any number of async Task (Futures) the same type?

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

##### Can we run any number of async Task (Futures) different types?

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

##### How we can get only one future result from many futures?

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

##### In what order async runtime `race` run futures passed in as arguments?

Order depend on implementations of `race`. Some implementations always runs the futures passed in as arguments in the order in which they’re passed. Other implementations are fair and will randomly choose which future to poll first.


##### How we can yield control from a long-running task to the Runtime?

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

