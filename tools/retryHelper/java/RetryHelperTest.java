package tools.retryHelper.java;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.opensearch.http.HttpException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class RetryHelperTest {
    private final RetryHelper subject;
    private MockExceptionContext context;
    public RetryHelperTest() {
        this.subject = RetryHelper.newInstance(2);
        this.context = MockExceptionContext.getInstance();
    }

    @Before
    public void setup() {
        context = mock(MockExceptionContext.class);
        when(context.multiply(1)).thenThrow(new HttpException("502 Bad Gateway")).thenReturn(2);
        when(context.multiply(2)).thenReturn(20);
        when(context.multiply(3)).thenReturn(30);
    }

    @Test
    public void testNoException() {
        final List<Integer> input = Arrays.asList(1, 2, 3);
        final List<Integer> result = input.stream()
                        .map(subject.retryHandler(x -> context.multiply(x)))
                        .collect(Collectors.toList());
        assertEquals(result.size(), 3);
    }

    @Test
    public void testNot502Exception() {
        final List<Integer> input = Arrays.asList(1, 2, 3);
        final Exception exception = assertThrows(RuntimeException.class, () -> {
            input.stream()
                    .map(subject.retryHandler(x -> context.multiplyWithNot502Exception(x)))
                    .collect(Collectors.toList());
        });
        assertEquals(exception.getMessage(), "java.lang.IllegalArgumentException: IllegalArgumentException");
    }

    @Test
    public void test502ExceptionRetrySuccessful() {
        this.context = mock(MockExceptionContext.class);
        when(context.multiply(1)).thenThrow(new HttpException("502 Bad Gateway")).thenReturn(10);
        when(context.multiply(2)).thenReturn(20);
        when(context.multiply(3)).thenReturn(30);

        final List<Integer> input = Arrays.asList(1, 2, 3);
        final List<Integer> result = input.stream()
                .map(subject.retryHandler(x -> context.multiply(x)))
                .collect(Collectors.toList());
        assertEquals(result.size(), 3);
    }

    @Test
    public void test502ExceptionRetryFailure() {
        this.context = mock(MockExceptionContext.class);
        when(context.multiply(1))
                .thenThrow(new HttpException("502 Bad Gateway"))
                .thenThrow(new HttpException("502 Bad Gateway"))
                .thenThrow(new HttpException("502 Bad Gateway"));

        final List<Integer> input = Arrays.asList(1, 2, 3);
        final Exception exception = assertThrows(RuntimeException.class, () -> {
            input.stream()
                    .map(subject.retryHandler(x -> context.multiply(x)))
                    .collect(Collectors.toList());
        });
        assertEquals(exception.getMessage(), "Retry 2 times failed!");
    }
}
