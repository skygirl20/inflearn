# dict = {"fast" : "빠른"}

class LinkedTuple:

    def __init__(self):
        self.items = []

    def add(self, key, value):
        self.items.append((key, value))

    def get(self, key):
        for k, v in self.items:
            if k == key:
                return v

    def put(self, key, value):
            index = hash(key) % len(self.items)

linked_tuple = LinkedTuple()

linked_tuple.add("333 ", 7)
linked_tuple.add("77", 6)

print(linked_tuple.items)




# class Dict:
#
#     def __init__(self):
#         self.items = [None] * 8
#
#     def put(self, key, value):
#         index = hash(key) % len(self.items)
#         self.items[index] = value
#
#     def get(self, key):
#         index = hash(key) % len(self.items)
#         return self.items[index]
#
# my_dict = Dict()
# my_dict.put("test", 3)
# print(my_dict.get("test"))