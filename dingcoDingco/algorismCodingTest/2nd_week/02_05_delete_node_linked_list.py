from operator import index


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
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

    def get_node(self, index):
        cur = self.head
        i = 0
        while i != index:
            cur = cur.next
            i += 1
        return cur

    # me
    # def add_node(self, index, value):
    #     cur = self.head
    #     new = []
    #     index_count = 0
    #
    #     while index_count != index:
    #         new.append(cur.data)
    #         index_count += 1
    #         cur = cur.next
    #     new.append(value)
    #
    #     while cur is not None:
    #         new.append(cur.data)
    #         index_count += 1
    #         cur = cur.next
    #
    #     # print("index:", index, " 위치에 value:", value, " 를 추가해주세요.")
    #     return new

    # solution
    def add_node(self, index, value):
        new_node = Node(value)
        if index == 0:
            new_node.next = self.head
            self.head = new_node
            return

        prev_node = self.get_node(index - 1)
        next_node = prev_node.next
        prev_node.next = new_node
        new_node.next = next_node

    def delete_node(self, index):
        print("index: ", index, "번째 노드를 제거해주세요.")
        if index == 0:
            #self.head = self.get_node(index + 1)
            self.head = self.head.next
            return
        prev_node = self.get_node(index - 1)
        next_node = self.get_node(index + 1)
        prev_node.next = next_node

linked_list = LinkedList(5)
linked_list.append(12)
linked_list.append(8)
linked_list.print_all()
print("구분선--------------")
# linked_list.get_node(0)# -> 5를 들고 있는 노드를 반환해야 합니다!
# print(linked_list.get_node(0).data)
linked_list.print_all()
print("구분선--------------")
linked_list.add_node(1, 6)
linked_list.print_all()
print("구분선--------------")
linked_list.delete_node(0)
linked_list.print_all()