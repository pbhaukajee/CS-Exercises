const ListNode = (value = null, nextNode = null) => {
  return {
    value,
    nextNode,
  };
};

const LinkedList = () => {
  let head = null;
  let size = 0;

  const append = (value) => {
    const newNode = ListNode(value);
    if (head === null) {
      head = newNode;
    } else {
      let pointer = head;
      while (pointer.nextNode !== null) {
        pointer = pointer.nextNode;
      }
      pointer.nextNode = newNode;
    }
    size++;
  };

  const prepend = (value) => {
    const newNode = ListNode(value, head);
    head = newNode;
    size++;
  };

  const at = (index) => {
    let indexCount = 0;
    let pointer = head;
    while (indexCount < index) {
      pointer = pointer?.nextNode;
      indexCount++;
    }
    return pointer;
  };

  const tail = () => {
    let pointer = head;
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    return pointer;
  };

  const pop = () => {
    let currPointer = head;
    let nextPointer = head.nextNode;
    while (nextPointer.nextNode !== null) {
      currPointer = currPointer.nextNode;
      nextPointer = nextPointer.nextNode;
    }
    const returnNode = nextPointer;
    currPointer.nextNode = null;
    size--;
    return returnNode;
  };

  const contains = (value) => {
    let pointer = head;
    while (pointer !== null) {
      if (pointer.value === value) return true;
      pointer = pointer.nextNode;
    }
    return false;
  };

  const find = (value) => {
    let indexCounter = 0;
    let pointer = head;
    while (pointer !== null) {
      if (pointer.value === value) return indexCounter;

      pointer = pointer.nextNode;
      indexCounter++;
    }
    return -1;
  };

  const toString = () => {
    let pointer = head;
    let string = "";
    while (pointer !== null) {
      string += `( ${pointer.value} ) -> `;
      pointer = pointer.nextNode;
    }
    return `${string}null`;
  };

  const insertAt = (value, index) => {
    if (index === 0) {
      prepend(value);
      return;
    }

    const nodeBeforeIndex = at(index - 1);
    const newNode = ListNode(value, nodeBeforeIndex.nextNode);
    nodeBeforeIndex.nextNode = newNode;
    size++;
  };

  const removeAt = (index) => {
    if (index === 0) {
      head = head.nextNode;
      return;
    }
    const nodeBeforeIndex = at(index - 1);
    nodeBeforeIndex.nextNode = nodeBeforeIndex.nextNode.nextNode;
    size--;
  };

  return {
    append,
    prepend,
    get size() {
      return size;
    },
    get head() {
      return head;
    },
    at,
    tail,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};
