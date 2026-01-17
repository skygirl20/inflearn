package loop.ex;

public class WhileEx3 {
    public static void main(String[] args) {
        int i = 1;
        int max = 100;
        int sum = 0;
        while(i <= max){
            sum = sum + i;
            i++;
        }
        System.out.println(sum);
    }
}
