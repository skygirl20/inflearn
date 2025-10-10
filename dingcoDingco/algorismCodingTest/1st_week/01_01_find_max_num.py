import logging

def find_max_num(array):
    # me
    # big = 0
    # for i in array:
    #     if big < i:
    #         big = i
    # return big

    #1
    # for number in array:
    #     is_max_num = True
    #     for compare_number in array:
    #         if number < compare_number:
    #             is_max_num = False
    #     if is_max_num:
    #         return number

    #2
    max_number = array[0]

    for number in array:
        if number > max_number:
            max_number = number
    return max_number

    return 1


print("정답 = 6 / 현재 풀이 값 = ", find_max_num([3, 5, 6, 1, 2, 4]))
print("정답 = 6 / 현재 풀이 값 = ", find_max_num([6, 6, 6]))
print("정답 = 1888 / 현재 풀이 값 = ", find_max_num([6, 9, 2, 7, 1888]))