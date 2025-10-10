# 회문은 똑바로 읽으나 거꾸로 읽으나 똑같은 단어나 문장을 의미합니다.
#
# 우영우
# 역삼역
# 기러기
# 토마토

# 같은 단어를 회문 이라고 합니다!
# 컴퓨터는 문자열을 보고 아래처럼 어떻게 회문인지 확인할 수 있을까요?

# Q. 다음과 같이 문자열이 입력되었을 때,
# 회문이라면 True 아니라면 False 를 반환하시오.

input = "eabcdcbaer"

def is_palindrome(string):

    # me
    # for i in range(len(string)):
    #     if(string[i] != string[len(string)-1-i]):
    #         print(string[i])
    #         print(string[len(string)-1-i])
    #         return False
    # return True

    # solution
    n = len(string)
    for i in range(n):
        if string[i] != string[n - 1 - i]                                       :
            return False
    return True

print(is_palindrome(input))