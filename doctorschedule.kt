package com.example.doctors_appointment.ui.booking

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.Today
import androidx.compose.material.icons.outlined.CalendarToday
import androidx.compose.material.icons.outlined.Today
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.doctors_appointment.MyApp.Companion.doctor
import com.example.doctors_appointment.data.model.Doctor
import com.example.doctors_appointment.ui.patientsUI.BottomNavigationItem
import com.example.doctors_appointment.ui.patientsUI.mainHome.fontInria
import com.example.doctors_appointment.ui.theme.Indigo400
import com.example.doctors_appointment.ui.theme.Indigo50
import com.example.doctors_appointment.ui.theme.Indigo900
import com.example.doctors_appointment.ui.DoctorUI.DoctorViewModel
import com.example.doctors_appointment.util.Screen


@Composable
fun DoctorSchedule(
    navController: NavController,
    doctorViewModel: DoctorViewModel
) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Indigo50)
            .padding(5.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Spacer(modifier = Modifier.height(40.dp))


        Text(
            text = "SCHEDULE APPOINTMENT",
            style = MaterialTheme.typography.headlineLarge,
            fontFamily = fontInria,
            color = Indigo900,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(40.dp))

        val items = listOf(

            BottomNavigationItem(
                title = "Today",
                route = "today",
                selectedIcon = Icons.Filled.Today,
                unselectedIcon = Icons.Outlined.Today,
                hasNews = false
            ),
            BottomNavigationItem(
                title = "Day 1",
                route = "day1",
                selectedIcon = Icons.Filled.CalendarToday,
                unselectedIcon = Icons.Outlined.CalendarToday,
                hasNews = false
            ),
            BottomNavigationItem(
                title = "Day 2",
                route = "day2",
                selectedIcon = Icons.Filled.CalendarToday,
                unselectedIcon = Icons.Outlined.CalendarToday,
                hasNews = false
            ),
            BottomNavigationItem(
                title = "Day 3",
                route = "day3",
                selectedIcon = Icons.Filled.CalendarToday,
                unselectedIcon = Icons.Outlined.CalendarToday,
                hasNews = false
            ),
            BottomNavigationItem(
                title = "Day 4",
                route = "day4",
                selectedIcon = Icons.Filled.CalendarToday,
                unselectedIcon = Icons.Outlined.CalendarToday,
                hasNews = false
            )
        )

        var selectedTabIndex by remember {
            mutableIntStateOf(0)
        }
        TabRow(
            selectedTabIndex = selectedTabIndex,
        ) {
            items.forEachIndexed { index, bottomNavigationItem ->
                Tab(
                    selected = selectedTabIndex == index,
                    onClick = {
                        selectedTabIndex = index
                    },
                    text = {
                        Text(
                            text = bottomNavigationItem.title,
                            fontFamily = fontInria,
                            fontSize = 13.sp
                        )
                    }
                )
            }

        }
        Spacer(modifier = Modifier.height(20.dp))

        var selectedSlot by remember {
            mutableIntStateOf(-1)
        }

        Text(
            text = "Morning Slots:",
            fontFamily = fontInria,
            fontWeight = FontWeight.Bold,
            fontSize = 20.sp,
            color = Indigo900
        )
        Spacer(modifier = Modifier.height(20.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            for (i in 0..2) {
                Slot(12 * (selectedTabIndex) + i, doctor, selectedSlot, doctorViewModel) {
                    selectedSlot = it
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround,
        ) {
            for (i in 3..5) {
                Slot(12 * (selectedTabIndex) + i, doctor, selectedSlot, doctorViewModel) {
                    selectedSlot = it
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "Evening Slots:",
            fontFamily = fontInria,
            fontWeight = FontWeight.Bold,
            fontSize = 20.sp,
            color = Indigo900
        )
        Spacer(modifier = Modifier.height(20.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            for (i in 6..8) {
                Slot(12 * (selectedTabIndex) + i, doctor, selectedSlot, doctorViewModel) {
                    selectedSlot = it
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            for (i in 9..11) {
                Slot(12 * (selectedTabIndex) + i, doctor, selectedSlot, doctorViewModel) {
                    selectedSlot = it
                    navController.navigate(Screen.doctorAppointmentDetails.route)
                }
            }
        }
        Spacer(modifier = Modifier.height(35.dp))


    }
}

@Composable
fun Slot(
    slotNo: Int,
    doctor: Doctor,
    selectedSlot: Int,
    doctorViewModel: DoctorViewModel,
    onSlotSelect: (Int) -> Unit,    // Callback to notify parent when a slot is selected
) {
    Button(
        onClick = {
            if (doctor.availabilityStatus[slotNo]) {
                onSlotSelect(slotNo) // Notify parent about the selection
            }
        },
        colors = ButtonDefaults.buttonColors(
            containerColor = if (slotNo == selectedSlot) Indigo400 else Color.White,
            contentColor = if (doctor.availabilityStatus[slotNo]) {
                if (selectedSlot == slotNo) Color.White else Indigo900
            } else Color.LightGray,
        )
    ) {
        Text(
            text = doctorViewModel.getTime(slotNo % 12).toString()
        )
    }
}
