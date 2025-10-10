# Q. 정수를 입력 했을 때, 그 정수 이하의 소수를 모두 반환하시오.
#
# 소수는 자신보다 작은 두 개의 자연수를 곱하여 만들 수 없는 1보다 큰 자연수이다.


input = 20


def find_prime_list_under_number(number):
    prime_list = []

    # 2부터 number까지 모든 수를 검사
    # for n in range(2, number + 1):
    #     is_prime = True  # 일단 소수라고 가정
    #
    #     # n이 소수인지 확인
    #     for i in range(2, n):
    #         print(i, n)
    #         if n % i == 0:
    #             is_prime = False
    #             break  # 나누어떨어지면 소수 아님
    #
    #     # 성능 증가방법(제곱근 이용)
    #     # for i in range(2, int(n ** 0.5) + 1):
    #     #     if n % i == 0:
    #     #         is_prime = False
    #     #         break
    #
    #     # 소수면 리스트에 추가
    #     if is_prime:
    #         prime_list.append(n)
    #
    # return prime_list

    # 단축버전
    # primes = []
    # for n in range(2, number + 1):
    #     for i in range(2, n):
    #         if n % i == 0:
    #             break
    #     else:
    #         primes.append(n)
    # return primes

    # 효율적인 solution
    # 굳이 자기보다 작은 전체 수를 비교하지말고 자기보다 낮은 소수만 가지고 비교하면 된다!
    prime_list = []
    for n in range(2, number + 1):
        for i in prime_list:
            # if n % i == 0:

            # 더 효율적인 solution
            # 위의 내가 푼 제곱근 방법+소수만 이용방법
            # N의 제곱근보다 크지 않은 어떤 소수로도 나누어 떨어지지 않는다.
            if i * i <= n and n % i == 0:
                break
        else:
            prime_list.append(n)
    return prime_list

# 실행
result = find_prime_list_under_number(input)
print(result)
