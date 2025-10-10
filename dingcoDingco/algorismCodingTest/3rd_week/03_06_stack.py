from inspect import stack


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Stack:
    def __init__(self):
        self.head = None

    def push(self, value):
        new_head = Node(value)
        new_head.next = self.head
        self.head = new_head

    # pop 기능 구현
    # 단순히 제거뿐 아니라 반환도 필요!
    def pop(self):
        if self.is_empty():
            print("stack is Empty")
        delete_head = self.head
        self.head = self.head.next
        return delete_head

    # 맨 처음(head) 값을 반환
    def peek(self):
        if self.is_empty():
            return "stack is Empty"
        return self.head.data

    # isEmpty 기능 구현
    # head가 없다면 비었겠지
    def is_empty(self):
        return self.head is None

stack = Stack()
stack.push(4)
print(stack.peek())

stack.push(3)
print(stack.peek())

stack.push(5)
print(stack.peek())

stack.pop()
print(stack.peek())

stack.pop()
print(stack.peek())

stack.pop()
print(stack.peek())