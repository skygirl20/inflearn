# Q. 초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때,
# 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 함수를 완성하세요.
#
# prices = [1, 2, 3, 2, 3]
# answer = [4, 3, 1, 1, 0]

prices = [1, 2, 3, 2, 3]


# me...
# def get_price_not_fall_periods(prices):
#     time = 0
#     result = []
#     for i in range(len(prices) - 1):
#         print(i, prices[i])
#         print(len(prices))
#         while prices[i+1] >= prices[i]:
#             time += 1
#             break
#         print("time: ", time)
#         result.append(time)
#
#     return result

# solution_1
# def get_price_not_fall_periods(prices):
#     result = [0] * len(prices)
#
#     for i in range(0, len(prices) - 1, 1):
#         for j in  range(i + 1, len(prices), 1):
#             print(j)
#
#     return result

# solution_2
def get_price_not_fall_periods(prices):
    result = [0] * len(prices)

    for i in range(0, len(prices) - 1, 1):
        price_not_fall_period = 0
        for j in  range(i + 1, len(prices), 1):
            if prices[i] <= prices[j]:
                price_not_fall_period += 1
            else:
                break
            print(j)
        result[i] = price_not_fall_period

    return result


print(get_price_not_fall_periods(prices))

print("정답 = [4, 3, 1, 1, 0] / 현재 풀이 값 = ", get_price_not_fall_periods(prices))
# print("정답 = [6, 2, 1, 3, 2, 1, 0] / 현재 풀이 값 = ", get_price_not_fall_periods([3, 9, 9, 3, 5, 7, 2]))
# print("정답 = [6, 1, 4, 3, 1, 1, 0] / 현재 풀이 값 = ", get_price_not_fall_periods([1, 5, 3, 6, 7, 6, 5]))