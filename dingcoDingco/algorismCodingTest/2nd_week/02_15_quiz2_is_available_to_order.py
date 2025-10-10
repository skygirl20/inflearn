# Q. 배달의 민족 서버 개발자로 입사했다.
# 상점에서 현재 가능한 메뉴가 ["떡볶이", "만두", "오뎅", "사이다", "콜라"] 일 때, 유저가 ["오뎅", "콜라", "만두"] 를 주문했다.
#
# 그렇다면, 현재 주문 가능한 상태인지 여부를 반환하시오.

shop_menus = ["만두", "떡볶이", "오뎅", "사이다", "콜라"]
shop_orders = ["오뎅", "콜라", "만두"]

# me 1
# def is_available_to_order(menus, orders):
#     match = 0
#     for menu in menus:
#         for order in orders:
#             if menu == order:
#                 match += 1
#
#     if match == len(orders):
#         return "주문 가능"
#     else:
#         return "주문 불가능"

# me 2
# def is_available_to_order(menus, orders):
#     for order in orders:
#         if order not in menus:
#             return "주문 불가능"
#     return "주문 가능"


# solution 1
def is_available_to_order(menus, orders):
    # O(logN) =+ O(M) * O(logN) = O((N+M)*log(N))
    menus.sort() # 메뉴의 길이가 N  -> O(NogN)
    for order in orders: # 오더의 길이가 M이라고 한다면 O(M)
        if not is_existing_target_number_binary(order, menus): # O(logN)
            return False
    return True

def is_existing_target_number_binary(target, array):
    current_min = 0
    current_max = len(array) - 1
    current_guess = (current_min + current_max) // 2

    find_count = 0

    while current_min <= current_max:
        find_count += 1
        if array[current_guess] == target:
            return True
        elif array[current_guess] < target:
            current_min = current_guess + 1
        else:
            current_max = current_guess - 1
        current_guess = (current_min + current_max) // 2
    return False

result = is_available_to_order(shop_menus, shop_orders)
print(result)