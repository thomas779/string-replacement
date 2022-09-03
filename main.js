let message = `
    Hello, John! You left a package at the office today.
    You can pick up tomorrow at 10am, John. 
    If not I will drop it off this weekend.
    Goodbye John!
`;

// Because a string is an array of characters, we must model
// this problem as an array manipulation problem (at least if
// we want to right optimal code in terms of performance).
//
// The frist function we'll need is one that can copy a slice
// of an array. Given we're working with strings, we will use
// the name "substr" to be short for "sub string". This
// function will return the slice given a:
//
// - string
// - start_index
// - end_index
//
// Now that we can copy slices around, we must find all the
// occurrences of our target string. We do this via a simple
// nested loop that iterates over the string and when it finds
// matching characters, it tries to iterate over the matches in
// step with the replacement string.
//
// Once we have all the indexes, we can copy all the none target
// slices out and concatenate those with the replacement string.

function substr(message, start_index, end_index) {
    let slice = "";

    for (let i = start_index; i < end_index; ++i) {
        slice = slice.concat(message[i]);
    }

    return slice;
}

function index_of_all(message, target) {
    const targets = [];

    for (let i = 0; i < message.length; i++) {
        let is_target = true;
        for (let j = 0; j < target.length; ++j) {
            if (message[i + j] !== target[j]) {
                is_target = false;
                break;
            }
        }

        if (is_target === true) {
            targets.push(i);
        }
    }

    return targets;
}

function replace_all(message, target, replacement) {
    let result = "";
    let last_target = 0;
    for (const index of index_of_all(message, target)) {
        const prev_slice = substr(message, last_target, index);

        result += prev_slice + replacement;
        last_target = index + target.length;
    }

    return result;
}

console.log(index_of_all(message, "John"));
console.log(replace_all(message, "John", "Jeff"));