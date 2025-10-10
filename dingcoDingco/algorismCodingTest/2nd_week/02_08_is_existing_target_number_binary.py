finding_target = 14
finding_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

# N

# 1 ~ N
# 처음 : 1 ... N
# 1번탐색 : 1 ... N/2
# 2번탐색 : 1 ... N/4
# 3번탐색 : 1 ... N/8
# k번탐색 : 1 ... N/2^k

# K번 탐색하면 -> N/2^k 개가 남는다.

# N/2^k -> 1이 되려면
# N = 2^k
# log_2(N) = k

# K번 탐색하면 1개의 원소를 찾을 수 있다.

# -> O(log_2(N)) -> 상수는 제거가능 ; O(log(N))

# log(N) -> 대충 반토만 나뉘면...

def is_existing_target_number_binary(target, array):
    current_min = 0
    current_max = len(array) - 1
    current_guess = (current_min + current_max) // 2

    find_count = 0

    while current_min <= current_max:
        find_count += 1
        if array[current_guess] == target:
            print(find_count)
            return True
        elif array[current_guess] < target:
            current_min = current_guess + 1
        else:
            current_max = current_guess - 1
        current_guess = (current_min + current_max) // 2
    return False


result = is_existing_target_number_binary(finding_target, finding_numbers)
print(result)