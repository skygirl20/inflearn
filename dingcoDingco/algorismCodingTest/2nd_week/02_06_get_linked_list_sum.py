# Q.  다음과 같은 두 링크드 리스트를 입력받았을 때, 합산한 값을 반환하시오.
#
# 예를 들어 아래와 같은 링크드 리스트를 입력받았다면,
# 각각 678, 354 이므로 두개의 총합
# 678 + 354 = 1032 를 반환해야 한다.
#
# 단, 각 노드의 데이터는 한자리 수 숫자만 들어갈 수 있다.

# [6] -> [7] -> [8]
# [3] -> [5] -> [4]

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

    # me
    def print_number(self):
        cur = self.head
        result = []
        while cur is not None:
            result.append(str(cur.data))
            cur = cur.next

        number = int(''.join(result))  # 문자열 → 숫자 변환
        # print(number)
        return number


# solution
def get_single_linked_list_sum(linked_list):
    sum = 0
    cur = linked_list.head
    while cur is not None:
        sum = sum * 10 + cur.data
        cur = cur.next

    return sum

def get_linked_list_sum(linked_list_1, linked_list_2):
    # me
    # sum = linked_list_1.print_number()+linked_list_2.print_number()
    # return sum
    sum_1 = get_single_linked_list_sum(linked_list_1)
    sum_2 = get_single_linked_list_sum(linked_list_2)

    return sum_1 + sum_2

linked_list_1 = LinkedList(6)
linked_list_1.append(7)
linked_list_1.append(8)

linked_list_2 = LinkedList(3)
linked_list_2.append(5)
linked_list_2.append(4)

# get_linked_list_sum(linked_list_1, linked_list_2)
print(get_linked_list_sum(linked_list_1, linked_list_2))