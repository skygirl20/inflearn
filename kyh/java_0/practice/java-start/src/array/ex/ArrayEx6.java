package array.ex;
import java.util.Scanner;

public class ArrayEx6 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("입력받을 숫자의 개수를 입력하세요:");
        int count = scanner.nextInt();

        int[] numbers = new int[count];

        Scanner scanner2 = new Scanner(System.in);
        System.out.println(count + "개의 정수를 입력하세요:");
        int max = 0;
        int min = 0;
        for(int i = 0; i < numbers.length; i++){
            numbers[i] = scanner2.nextInt();
            if(i == 0){
                max = numbers[i];
                min = numbers[i];
            }else{
                if(numbers[i] > max){
                    max = numbers[i];
                }
                if(numbers[i] < min){
                    min = numbers[i];
                }
            }
        }

        System.out.println("가장 큰 정수: " + max);
        System.out.println("가장 작은 정수: " + min);

    }
}
