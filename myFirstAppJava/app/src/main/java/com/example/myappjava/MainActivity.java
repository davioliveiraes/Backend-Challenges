package com.example.myappjava;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private EditText myEditText;
    private Button myButton;
    private TextView myTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main); // usa o seu XML direto

        myEditText = findViewById(R.id.myEditText);
        myButton = findViewById(R.id.myButton);
        myTextView = findViewById(R.id.myTextView);

        myButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String textoDigitado = myEditText.getText().toString();
                myTextView.setText("Você digitou: " + textoDigitado);
            }
        });
    }
}
