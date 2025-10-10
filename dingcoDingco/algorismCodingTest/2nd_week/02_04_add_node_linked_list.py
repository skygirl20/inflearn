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
#            print(cur.data)
            cur = cur.next

    def get_node(self, index):
        cur = self.head
#        print("index: ", index)
#        print("현재 값: ", cur.data)
        i = 0
        while i != index:
            cur = cur.next
            i += 1
        return cur

    def add_node(self, index, value):
        cur = self.head
        new = []
        index_count = 0

        while index_count != index:
            new.append(cur.data)
            index_count += 1
            cur = cur.next
        new.append(value)

        while cur is not None:
            new.append(cur.data)
            index_count += 1
            cur = cur.next

        # print("index:", index, " 위치에 value:", value, " 를 추가해주세요.")
        return new

linked_list = LinkedList(5)
linked_list.append(12)
linked_list.append(8)
# linked_list.get_node(0)# -> 5를 들고 있는 노드를 반환해야 합니다!
# print(linked_list.get_node(0).data)
linked_list.print_all()
linked_list.add_node(1, 6)
print(linked_list.add_node(0, 10))