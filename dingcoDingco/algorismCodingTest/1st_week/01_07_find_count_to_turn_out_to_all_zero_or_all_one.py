# Q.
# 0과 1로만 이루어진 문자열이 주어졌을 때, 이 문자열에 있는 모든 숫자를 전부 같게 만들려고 한다.
# 할 수 있는 행동은 문자열에서 연속된 하나 이상의 숫자를 잡고 모두 뒤집는 것이다.
# 뒤집는 것은 1을 0으로, 0을 1로 바꾸는 것을 의미한다.
#
# 예를 들어 S=0001100 일 때,
#
# 전체를 뒤집으면 1110011이 된다.
# 4번째 문자부터 5번째 문자까지 뒤집으면 1111111이 되어서 2번 만에 모두 같은 숫자로 만들 수 있다.
# 하지만, 처음부터 4번째 문자부터 5번째 문자까지 문자를 뒤집으면 한 번에 0000000이 되어서
# 1번 만에 모두 같은 숫자로 만들 수 있다.
#
# 주어진 문자열을 모두 0 혹은 모두 1로 같게 만드는 최소 횟수를 반환하시오.

input = "011110"
# input = "0000"
# input = '01100101100'

def find_count_to_turn_out_to_all_zero_or_all_one(string):
    # me
    # digits = list(string)
    # print(digits)
    # count = 0
    #
    # # 뒤집을 필요가 없다면? / 뒤집어야한다면?
    # for i in range(len(digits) - 1):  # 마지막은 비교할 다음 문자가 없으니까 -1
    #     if digits[i] != digits[i + 1]:
    #         count += 1
    #
    # if count != 1 and count != 0:
    #     count /= 2
    # return int(count)

    # solution
    count_to_all_one = 0
    count_to_all_zero =0

    if string[0] == '0':
        count_to_all_one += 1
    elif string[0] == '1':
        count_to_all_zero += 1

    for i in range(len(string) - 1):
        if string[i] != string[i + 1]:
            if string[i + 1] == '0':
                count_to_all_one += 1
            if string[i + 1] == '1':
                count_to_all_zero += 1

    print(count_to_all_one, count_to_all_zero)
    return min(count_to_all_one, count_to_all_zero)

result = find_count_to_turn_out_to_all_zero_or_all_one(input)
print(result)