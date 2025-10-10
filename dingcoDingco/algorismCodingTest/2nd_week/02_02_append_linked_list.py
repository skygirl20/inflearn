class Node:

    def __init__(self, data):
        self.data = data
        self.next = None

node = Node(5)
# print(node.data, node.next)

next_node = Node(3)
node.next = next_node

class linkedList:

    def __init__(self, value):
        self.head = Node(value)

    def append(self, value):
        cur = self.head
        while cur.next is not None:
            cur = cur.next
        cur.next = Node(value)

    def print_all(self):
        cur = self.head

        while cur is not None:
            print(cur.data)
            cur = cur.next

        print("출력해보세요")

linked_list = linkedList(5)


linked_list.append(12)
# [5] -> [12]
linked_list.append(8)
#[5] -> [12] -> [8]
linked_list.print_all()
