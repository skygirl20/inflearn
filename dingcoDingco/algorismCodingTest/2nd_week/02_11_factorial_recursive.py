# 팩토리얼은 1부터 어떤 양의 정수 n까지의 정수를 모두 곱한 것을 의미합니다.
#
# 예를 들면 아래와 같습니다!
# 3! 은 3 * 2 * 1 = 6,
# 4! 는 4 * 3 * 2 * 1 = 4 * 3! = 24

def factorial(n):
    # me
    # if n != 0:
    #     result = n * factorial(n - 1)
    # else:
    #     return 1
    # return result

    # solution
    if n == 1:
        return 1

    return n * factorial(n - 1)


print(factorial(5))