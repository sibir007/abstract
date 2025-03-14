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



