# Q. 맥스 힙은 원소를 제거한 다음에도 맥스 힙의 규칙을 유지해야 한다.
# 맥스 힙의 원소를 제거하시오.

class MaxHeap:
    def __init__(self):
        self.items = [None]

    def insert(self, value):
        self.items.append(value)
        cur_index = len(self.items) - 1

        while cur_index > 1:  # cur_index 가 1이 되면 정상을 찍은거라 다른 것과 비교 안하셔도 됩니다!
            parent_index = cur_index // 2
            if self.items[parent_index] < self.items[cur_index]:
                self.items[parent_index], self.items[cur_index] = self.items[cur_index], self.items[parent_index]
                cur_index = parent_index
            else:
                break

    # 1.  root와 맨끝의 위치를 바꾼다.
    # 2. 그리고 바뀐 root_node를 자식과 비교한다
    # 3. 그리고 자식들이 크다면, 둘 중 더 큰 자식과 위치를 바꾼다.
    # 4. 이 과정을 바닥을 찍을때까지 혹은 내가 자식보다 클때까지 반속
    # 5. 그리고 나서 1번의 root노드 반환
    def delete(self):
        self.item[1], self.items[-1] = self.items[-1], self.items[1]

        prev_max = self.items.pop()

        cur_index = 1
        while cur_index <= len(self.items) - 1:
            left_child_index = cur_index * 2
            right_child_index = cur_index * 2 + 1
            max_index = cur_index

            if left_child_index <= len(self.items) - 1 and self.items[left_child_index] > self.items[max_index]:
                max_index = left_child_index

            if max_index == cur_index:
                break

            self.items[cur_index], self.items[max_index] = self.items[max_index], self.items[cur_index]
            cur_index = max_index
        return prev_max  # 8 을 반환해야 합니다.


max_heap = MaxHeap()
max_heap.insert(8)
max_heap.insert(6)
max_heap.insert(7)
max_heap.insert(2)
max_heap.insert(5)
max_heap.insert(4)
print(max_heap.items)  # [None, 8, 6, 7, 2, 5, 4]
print(max_heap.delete())  # 8 을 반환해야 합니다!
print(max_heap.items)  # [None, 7, 6, 4, 2, 5]