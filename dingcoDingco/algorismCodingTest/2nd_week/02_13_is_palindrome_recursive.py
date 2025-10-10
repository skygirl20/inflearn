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

input = "eabcdcbae"

def is_palindrome(string):
    if string[0] != string[-1]:
        return False
    if len(string) <= 1:
        return True

    return is_palindrome(string[1:-1])

print(is_palindrome(input))