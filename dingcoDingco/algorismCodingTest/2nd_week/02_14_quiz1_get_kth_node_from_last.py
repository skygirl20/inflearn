# Q. 링크드 리스트의 끝에서 K번째 값을 반환하시오.
#
# [6] -> [7] -> [8] # 이런 링크드 리스트가 입력되었을 때,
#                   # 끝에서 2번째 값은 7을 반환해야 합니다!

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

    # me
    # def get_kth_node_from_last(self, k):
    #     # (1) k가 0 이하일 때
    #     if k <= 0:
    #         return Node("k는 1 이상이어야 합니다.")
    #     first = self.head
    #     second = self.head
    #
    #     # (2) k가 리스트 길이보다 클 때
    #     for _ in range(k):
    #         if first is None:
    #             return Node("리스트 길이보다 k가 큽니다.")
    #         first = first.next
    #
    #     # (3) 정상적인 경우: 같이 이동
    #     while first:
    #         first = first.next
    #         second = second.next
    #
    #     return second

    # solution 1
    # 1. 우선 모든 linkedList의 길이를 구한다
    # 2. linkedList 의 길이에서 k만큼을 빼고, 그만큼 이동시킨다.
    # 3. 그 노드를 반환한다.
    # def get_kth_node_from_last(self, k):
    #     length = 1
    #     cur = self.head
    #
    #     while cur.next is not None:
    #         cur = cur.next
    #         length += 1
    #
    #     end_length = length - k
    #     cur = self.head
    #
    #     for i in range(end_length):
    #         cur = cur.next
    #     return cur

    # solution 2 - me와 비슷
    def get_kth_node_from_last(self, k):
        slow = self.head
        fast = self.head

        for i in range(k):
            fast = fast.next

        while fast is not None:
            slow = slow.next
            fast = fast.next

        return slow



linked_list = LinkedList(6)
linked_list.append(7)
linked_list.append(8)

print(linked_list.get_kth_node_from_last(3).data)  # 7이 나와야 합니다!