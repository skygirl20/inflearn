# Q. 피보나치 수열의 20번째 수를 구하시오.

input = 20

# fibo(2) fibo(1) = 1
# fibo(n) = fibo(n-1) + fibo(n-2)


def fibo_recursion(n):
    if n == 1 or n == 2:
        return 1

    return fibo_recursion(n - 1) + fibo_recursion(n - 2)


print(fibo_recursion(input))  # 6765